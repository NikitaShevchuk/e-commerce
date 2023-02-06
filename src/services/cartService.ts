import axios from "axios";
import { CartProduct } from "../models/CartProduct";

const cartInstance = axios.create({
    baseURL: "https://62d8405090883139358e3103.mockapi.io/"
});

export const cartApi = {
    getCart: () => {
        return cartInstance.get("cart").then<CartProduct[]>((response) => response.data);
    },
    addCartItem: (cartItem: CartProduct) => {
        return cartInstance.post("cart", cartItem).then<CartProduct>((response) => response.data);
    },
    removeItem: (id: string) => {
        return cartInstance.delete(`cart/${id}`).then<CartProduct>((response) => response.data);
    },
    modifyCartItem: (cartItem: CartProduct) => {
        return cartInstance
            .put(`cart/${cartItem.id}`, cartItem)
            .then<CartProduct>((response) => response.data);
    }
};
