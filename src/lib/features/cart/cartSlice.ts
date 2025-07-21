import { Product, Topping } from "@/lib/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = {
        product: action.payload.product,
        chosenConfiguration: action.payload.chosenConfiguration,
      };
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem])
      );
      return {
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            chosenConfiguration: action.payload.chosenConfiguration,
          },
        ],
      };
    },
    setInitialCartItem: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems.push(...action.payload);
    },
  },
});

export const { addToCart, setInitialCartItem } = cartSlice.actions;
export default cartSlice.reducer;
