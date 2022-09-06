import {RootState} from "../store";
import {CartInitialState} from "../slices/cartSlice";

export const cartSelector = (state: RootState): CartInitialState => state.cartSlice