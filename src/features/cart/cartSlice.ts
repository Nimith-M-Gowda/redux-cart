import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface cartDataType {
  items: { [productID: string]: number };
}

const initialState: cartDataType = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },

    removeItemFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.items[id];
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
});

export const { addToCart, removeItemFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

export function getNumItems(state: RootState) {
  let numItems = 0;

  for (let id in state.cartState.items) {
    numItems += state.cartState.items[id];
  }

  return numItems;
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cartState.items,
  (items) => {
    let memoizedNumItems = 0;
    for (let id in items) {
      memoizedNumItems += items[id];
    }
    return memoizedNumItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cartState.items,

  (state: RootState) => state.productState.products,

  (items, products) => {
    let totalPrice = 0;
    Object.entries(items).forEach(
      ([id, quantity]) => (totalPrice += quantity * products[id].price)
    );

    return totalPrice.toFixed(2);
  }
);
