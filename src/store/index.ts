// src/store/index.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PersistConfig } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import filtersReducer from "./slices/filtersSlice";
import ordersReducer from "./slices/ordersSlice";

const cartPersistConfig: PersistConfig<ReturnType<typeof cartReducer>> = {
  key: "cart",
  storage: AsyncStorage,
};
const ordersPersistConfig: PersistConfig<ReturnType<typeof ordersReducer>> = {
  key: "orders",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  filters: filtersReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  orders: persistReducer(ordersPersistConfig, ordersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
