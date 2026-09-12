# Gigabox Implementation Checklist

> Primary targets are iOS and Android. Web should remain type-safe and buildable where practical, but web-specific layout and static-rendering work is out of scope unless requested.

## Architecture Decisions

- [x] Keep Expo Router as the routing system.
- [x] Keep `NativeTabs` for the native glass tab experience.
- [ ] Add a navigation implementation switch at the application entry boundary so the app can choose between Expo Router and React Navigation.
- [ ] Keep screens, feature state, API services, and UI components independent of the chosen navigation implementation.
- [x] Represent navigator boundaries with route groups and nested `_layout.tsx` files.
- [x] Confirm the Expo SDK 57 `NativeTabs` route-group naming syntax before wiring the tabs.
- [ ] Keep navigation concerns in `src/app` and reusable screens/components outside route files.
- [ ] Use React Query for server/catalog state.
- [ ] Use Redux Toolkit for client state such as filters, cart, checkout, and tracking.
- [ ] Persist query cache, cart state, and active order/tracking state across app restarts.

## Target Route Structure

Conceptual structure:

```text
src/app/
├── _layout.tsx                    RootLayout / RootNavigator
├── (auth)/
│   ├── _layout.tsx                AuthNavigator
│   └── sign-in.tsx
└── (main)/
    ├── _layout.tsx                MainNavigator / NativeTabs
    ├── (home)/
    │   ├── _layout.tsx            HomeNavigator / HomeStack
    │   ├── index.tsx               HomeScreen
    │   ├── product/[id].tsx        ProductDetailsScreen
    │   └── search.tsx              SearchScreen
    ├── (explore)/
    │   ├── _layout.tsx            ExploreNavigator / ExploreStack
    │   ├── index.tsx               ExploreScreen
    │   └── product/[id].tsx        ProductDetailsScreen
    ├── cart.tsx                    CartScreen
    ├── checkout.tsx                CheckoutScreen
    └── tracking/[orderId].tsx      TrackingScreen
```

Implementation notes:

- [x] Replace starter `index.tsx` content with the real HomeScreen entry.
- [x] Replace starter `explore.tsx` content with the real ExploreScreen entry.
- [x] Rename `TabTwoScreen` to `ExploreScreen`.
- [ ] Keep product details reachable from both Home and Explore stacks.
- [ ] Decide whether cart, checkout, and tracking are shared Main routes or modal routes.
- [x] Repurpose `src/components/app-tabs.tsx` so tab ownership is rendered by the Main route layout.
- [ ] Keep `src/navigation/` only for shared route params/types and navigation helpers if Expo Router does not need a standalone navigator component.

## Root Setup and Providers

- [x] Make the root `src/app/_layout.tsx` the single place for splash handling and app-level providers.
- [x] Add `QueryClientProvider` using the existing `queryClient`.
- [x] Add Redux `Provider` using the existing store.
- [x] Preserve the theme provider and animated splash overlay.
- [ ] Add a root connectivity listener using NetInfo.
- [ ] Add a global offline banner.
- [x] Define the auth-state boundary, even if the first version uses a local/mock auth state.
- [x] Ensure persisted auth state rehydrates before dependent screens render.
- [ ] Verify deep links and cold starts for grouped routes.

## Existing Catalog Work To Connect

- [x] Connect `HomeScreen` to `useCatalogInfiniteQuery`.
- [x] Connect category data to `useCategoriesQuery`.
- [x] Connect `filtersSlice` to the selected category chips.
- [x] Flatten infinite-query pages into the FlashList data source.
- [x] Add initial loading, pagination loading, and error states.
- [ ] Add pull-to-refresh and retry behavior.
- [ ] Preserve cached catalog pages while offline.
- [ ] Refresh or retry stale catalog queries after reconnect.
- [ ] Add stable item sizing and tune FlashList for low-end Android.
- [ ] Memoize product cards where profiling shows it is useful.
- [ ] Add stable keys and avoid layout shifts while images load.
- [ ] Make product cards navigate to the shared product details route.

## Search

- [x] Add the catalog search API endpoint and response types.
- [x] Add a debounced search input.
- [x] Add a search query keyed by the current debounced query.
- [x] Pass React Query's `AbortSignal` to Axios.
- [x] Ensure stale requests are cancelled or ignored so old results cannot replace newer results.
- [x] Add loading, empty, error, and offline states.
- [ ] Decide whether search belongs in HomeStack, ExploreStack, or both.
- [ ] Keep search results out of persisted query cache unless there is a clear product reason.

## Product Details

- [x] Add product details route params and typed route data.
- [ ] Load the selected product from cache when possible.
- [x] Add a fallback product-details API request.
- [x] Build an image carousel using the product image list.
- [ ] Add price, discount, rating, stock, and description presentation.
- [x] Add a quantity stepper with stock limits.
- [ ] Add add-to-cart behavior.
- [ ] Add a Reanimated add-to-cart confirmation animation.
- [ ] Handle unavailable products and failed detail requests.

## Cart and Checkout

- [ ] Add a cart slice with product, quantity, and price data.
- [ ] Add increment, decrement, direct quantity edit, and remove actions.
- [ ] Persist cart state through app restarts.
- [ ] Add cart badge/count access from the main app UI.
- [ ] Add subtotal calculation.
- [ ] Define the delivery-fee threshold and fee values as constants.
- [ ] Add free delivery above the configured threshold.
- [ ] Add checkout validation for an empty cart and invalid quantities.
- [ ] Create a local mock order on checkout.
- [ ] Persist the active order and order history locally.
- [ ] Navigate to tracking after successful checkout.

## Live Order Tracking

- [ ] Define typed order and tracking status models.
- [ ] Implement the status progression:
  - [ ] `PLACED`
  - [ ] `PACKED`
  - [ ] `OUT_FOR_DELIVERY`
  - [ ] `DELIVERED`
- [ ] Implement a local ticker/mock socket emitting every 2-3 seconds.
- [ ] Emit courier coordinates with each tracking update.
- [ ] Stop the ticker after delivery or when the order is no longer active.
- [ ] Render the courier and route state with `react-native-maps`.
- [ ] Add visible status progression and estimated delivery information.
- [ ] Persist the last tracking status, coordinates, and timestamp.
- [ ] Recalculate progression after backgrounding or app restart instead of resetting it.
- [ ] Handle tracking when the device is offline.

## Offline and Error Handling

- [ ] Add a shared connectivity state from NetInfo.
- [ ] Show a non-blocking offline banner.
- [ ] Allow previously cached catalog pages to remain browsable offline.
- [ ] Disable or explain actions that require network access.
- [ ] Retry failed requests after reconnect with sensible limits.
- [ ] Add consistent error UI with retry actions.
- [ ] Distinguish empty results from request failures.
- [ ] Test airplane mode, reconnect, app restart, and background/foreground transitions.

## State and Persistence

- [ ] Keep server state in React Query rather than duplicating catalog data in Redux.
- [ ] Add cart state to Redux.
- [ ] Add order/tracking state to Redux or a dedicated persisted store slice.
- [ ] Configure Redux persistence for cart and active order data.
- [ ] Add migrations/versioning for persisted state.
- [ ] Confirm query-cache hydration and Redux hydration do not race the first screen.
- [ ] Add selectors and typed actions for each client-state slice.

## Navigation and Type Safety

- [ ] Define route params for product IDs and order IDs.
- [ ] Keep route names consistent with screen names.
- [ ] Verify tab history behavior when opening detail screens.
- [ ] Verify back navigation from detail, cart, checkout, and tracking.
- [ ] Verify tab switching preserves each tab stack.
- [ ] Verify deep links to products and tracking routes.
- [ ] Remove starter navigation copy from the Explore screen.
- [ ] Keep navigation-specific types in `src/navigation/types.ts` where useful.

## Verification

- [ ] Run TypeScript checks with no errors.
- [ ] Run the configured lint command successfully.
- [ ] Test Home and Explore on iOS.
- [ ] Test Home and Explore on Android, including a mid/low-end device or emulator profile.
- [ ] Test web routing if web support remains required.
- [ ] Verify fast catalog scrolling has no blank cells.
- [ ] Verify changing filters does not leave stale results visible.
- [ ] Verify fast typing never displays results for an older query.
- [ ] Verify cart contents survive a force-close and restart.
- [ ] Verify tracking survives backgrounding and restart.
- [ ] Verify offline browsing and reconnect retry behavior.
- [ ] Verify add-to-cart animation and tab-stack transitions.
- [ ] Add focused tests for query cancellation, delivery fee calculation, cart persistence, and tracking progression.

## Post-Project React Navigation Option

This work happens after the Expo Router implementation and feature set are complete.

- [ ] Add React Navigation dependencies and create a parallel React Navigation implementation.
- [ ] Recreate the conceptual hierarchy: `RootNavigator`, `AuthNavigator`, `MainNavigator`, `HomeStack`, and `ExploreStack`.
- [ ] Preserve the same screen contracts, route params, headers, tab behavior, and deep-link destinations.
- [ ] Add a single switch near the application entry point to select Expo Router or React Navigation.
- [ ] Decide whether the switch is a development feature flag, environment variable, or build configuration.
- [ ] Ensure only the selected navigation tree mounts at runtime.
- [ ] Verify that Redux, React Query, persistence, offline behavior, and tracking work with both implementations.
- [ ] Compare native tab behavior and document that Expo Router remains the implementation with native glass `NativeTabs`.
