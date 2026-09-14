# Grocery Delivery App

## Setup

```bash
# install dependencies
npm install

# install native/Expo-matched packages (if not already installed)
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install @shopify/flash-list react-native-reanimated react-native-gesture-handler
npx expo install react-native-maps expo-image @react-native-async-storage/async-storage
npx expo install @react-native-community/netinfo expo-notifications

# requires a dev build (react-native-maps and local notifications don't fully work in Expo Go)
npx expo prebuild --clean
npx expo run:android   # or: npx expo run:ios
```

Add a Google Maps API key in `app.json` under `android.config.googleMaps.apiKey` before
running on Android — the map screen will crash without it.

## Architecture overview

- **TypeScript** throughout.
- **State split:** Redux Toolkit for client state (cart, filters, network status, tracking
  ticker). TanStack Query for all server state (catalog, search, product details) —
  including caching and offline persistence via `persistQueryClient` + `AsyncStorage`.
- **Component structure:** atomic-design-style, but scoped per screen rather than global
  buckets — each page has its own template folder, with organism/molecule/atom components
  nested inside based on where they're used (e.g.
  `components/HomeTemplate/BrowseCatalog/ProductCard/`). Shared components live in
  `components/common/`. Each level has a matching `skeleton.tsx`.
- **Data flow:** pages own queries and Redux selectors; templates arrange layout and pass
  data down; atoms are pure/prop-driven. `AddToCartButton` is the one exception that
  dispatches to Redux directly.
- **Navigation:** React Navigation — 3 bottom tabs (Home, Search, Cart), each with its own
  native stack. Cart → Checkout → Tracking is a push flow within the Cart stack, using
  `replace()` after order placement so the user can't navigate back into a completed
  checkout.
- **Catalog API:** [dummyjson.com](https://dummyjson.com) for products, search, and
  pagination.
- **List performance:** FlashList (cell recycling) + `expo-image` with `recyclingKey` for
  caching — see `PERFORMANCE.md` for details.

## Assumptions

- Checkout is fully mocked — fake delivery address and payment method selection, no real
  payment processing.
- "Live" order tracking is a local simulation (a timestamp-driven ticker), not a real
  delivery/courier backend.
- DummyJSON is treated as the full catalog source of truth; no separate backend.
- Push/local notifications are used for order status changes, not a real push service.

## What I'd do next with more time

- Replace the mocked courier ticker with a structure that could plug into a real
  WebSocket/push-based tracking backend.
- Expand offline support beyond catalog browsing — e.g. queue cart/order actions made while
  offline and sync on reconnect.
- Add proper form validation on the checkout address fields.
- Tune FlashList/image performance numbers with real profiling data on a low-end device.

## Notification deep-linking

Added a local scheduled notification for deep-linking: a bell icon on the Product Details
screen schedules a notification (fires 5 seconds after tapping) carrying the product ID as
payload. Tapping the notification navigates back into that specific product's details
screen, handling both warm-app taps and cold-start launches from a killed state.

## AI tools used

- **Claude** — used for syntax help and bug fixing, and for searching library docs
  (`expo-notifications`, `react-native-maps`) when hitting errors like missing notification
  channels or the Android Google Maps API key crash. Mainly used it for the local delivery
  tracking simulation logic. Also used it to generate a simple cart icon asset.
- **GitHub Copilot** — inline code generation for repetitive component scaffolding (e.g.
  checkout screen sections) based on prompts describing the existing patterns to follow.
