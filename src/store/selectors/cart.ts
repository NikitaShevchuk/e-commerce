import { type CartInitialState } from "../slices/cartSlice/Types";
import { type RootState } from "../store";

export const cartSelector = (state: RootState): CartInitialState => state.cartSlice;
