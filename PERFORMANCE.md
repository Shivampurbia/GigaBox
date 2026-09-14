# PERFORMANCE.md

## Component architecture — atomic design
Followed an atomic-design-style structure for screens and components (page → template →
nested organism/molecule/atom folders, each scoped to the screen that uses it, with shared
pieces in `components/common/`). Chosen for readability and maintainability — each piece of
UI lives next to where it's actually used instead of in flat global buckets, so tracing a
bug or adding a feature means working within one folder tree rather than jumping across
unrelated directories.

## Navigation — migrated from Expo Router back to React Navigation
Initially used Expo Router for the native glass tabs UI. As screens were added and the
project's scope kept expanding, file-based routing started working against us —
readability and maintainability suffered, and debugging/fixing navigation issues looked
like it would cost more time long-term than a standard stack/tab setup. Migrated back to
React Navigation (bottom tabs + nested native stacks) for more explicit, predictable
control over the navigation tree.

## API response caching (TanStack Query) — Home and Search
Both the Home catalog grid and Search results go through TanStack Query rather than raw
fetch calls, so responses are cached by query key instead of re-fetched on every mount.

- **Home:** `useInfiniteQuery` keyed on `['catalog', category]` — switching category chips
  or navigating away and back reads from cache instantly if that category was already
  fetched, instead of re-hitting the API.
- **Search:** results cached per query string, so re-running an identical search (or
  navigating back to a previous search) doesn't refire the network request.
- Both benefit from the shared `queryClient` config (`staleTime`, `gcTime`,
  `networkMode: 'offlineFirst'`), and Home's catalog pages are persisted to `AsyncStorage`
  for offline/cold-start availability (see below) — Search is deliberately excluded from
  persistence so stale results don't rehydrate and look live.

## List rendering (product catalog grid)
**Observed:** Plain `FlatList` caused blank cells and dropped frames on fast scroll on
mid/low-end Android — cells were mounting/unmounting per item instead of being reused.

**Fix:** Switched to `@shopify/flash-list`, which recycles a small pool of component
instances instead of mounting fresh ones per item. Set `estimatedItemSize` to the real
card height for correct pool sizing, and wrapped `ProductCard` in `React.memo` to skip
re-renders when a recycled cell gets identical props.

## Image flicker during fast scroll
**Observed:** Product thumbnails flickered/showed the previous item's image briefly during
recycling, since core RN `Image` has no real cache and re-decodes on every reassignment.

**Fix:** Replaced `Image` with `expo-image` (`cachePolicy="memory-disk"`) and added
`recyclingKey={product.id}` so recycled cells clear stale bitmaps immediately instead of
holding the old frame while the new image loads.

## Re-renders on category filter change
**Observed:** Risk of the full list re-rendering or blocking the UI thread on every chip tap.

**Fix:** Made category part of the TanStack Query key (`['catalog', category]`) instead of
filtering client-side, so switching categories points at a different cache entry — instant
if already fetched, no full-list remount either way. Kept chip `onSelect` handlers stable to
avoid unnecessary re-renders down the tree.

## Startup / cold-start data availability
**Observed:** Catalog showed a blank/loading state on cold start even with previously
fetched data, since nothing persisted the query cache.

**Fix:** Added `persistQueryClient` + `createAsyncStoragePersister` to persist the TanStack
Query cache to `AsyncStorage`, with `networkMode: 'offlineFirst'` so cached data renders
immediately and revalidates in the background. Excluded `search` from persistence so stale
search results don't rehydrate and look live.

## Add-to-cart animation
**Fix:** Used `react-native-reanimated` (`useSharedValue`/`withSpring`) instead of core
`Animated`, so the press-feedback animation runs on the UI thread and stays smooth even if
the JS thread is busy.
