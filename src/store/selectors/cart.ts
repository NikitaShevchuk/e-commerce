import { CartInitialState } from "../slices/cartSlice/Types";
import { RootState } from "../store";

export const cartSelector = (state: RootState): CartInitialState => state.cartSlice;
