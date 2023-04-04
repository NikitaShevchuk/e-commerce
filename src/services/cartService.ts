import axios from "axios";
import { type CartProduct } from "../types/CartProduct";

const cartInstance = axios.create({
    baseURL: "https://62d8405090883139358e3103.mockapi.io/"
});

export const cartApi = {
    getCart: async () => {
        return await cartInstance.get("cart").then<CartProduct[]>((response) => response.data);
    },
    addCartItem: async (cartItem: CartProduct) => {
        return await cartInstance
            .post("cart", cartItem)
            .then<CartProduct>((response) => response.data);
    },
    removeItem: async (id: string) => {
        return await cartInstance
            .delete(`cart/${id}`)
            .then<CartProduct>((response) => response.data);
    },
    modifyCartItem: async (cartItem: CartProduct) => {
        return await cartInstance
            .put(`cart/${cartItem.id}`, cartItem)
            .then<CartProduct>((response) => response.data);
    }
};
