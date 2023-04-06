import { type CartInitialState } from "../slices/cart";
import { type RootState } from "../store";

export const cartSelector = (state: RootState): CartInitialState => state.cartSlice;
