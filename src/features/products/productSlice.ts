import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/api";

export interface ProductDataType {
  products: { [id: string]: Product };
}

const initialState: ProductDataType = {
  products: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    insertProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

export const { insertProducts } = productSlice.actions;
export default productSlice.reducer;
