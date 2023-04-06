import { type ICategory } from "@/types/ICategory";

export enum RequestStatus {
    loading = "loading",
    error = "error",
    fulfilled = "fulfilled"
}

export interface ThunkError {
    body: string;
    alertType: "warning" | "error";
}

export enum ErrorsAlert {
    addToCart = "Can't add item to cart",
    modifyCartItemCount = "Over rate limit",
    removeCartItem = "Can't remove product from cart",
    getCartItems = "Can't load your shopping cart",
    valueIsNotValid = "Please enter valid number no greater than 10"
}

export type LoadingIDs = string[];

export enum CountAction {
    increase = "increase",
    decrease = "decrease",
    replace = "replace"
}

export interface SelectedCartItem {
    newCartItem: {
        name: string;
        image: string;
        price: string;
        color: string;
        productId: string;
        category: ICategory;
    };
    size: string;
}
