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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState) {
  console.log("Hi");
  let numItems = 0;

  for (let id in state.cartState.items) {
    numItems += state.cartState.items[id];
  }

  return numItems;
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cartState.items,
  (items) => {
    console.log("bye");
    let memoizedNumItems = 0;
    for (let id in items) {
      memoizedNumItems += items[id];
    }
    return memoizedNumItems;
  }
);
