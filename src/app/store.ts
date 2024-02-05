import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./../features/products/productSlice";
import cartSlice from "./../features/cart/cartSlice";

export const store = configureStore({
  reducer: { cartState: cartSlice, productState: productSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
