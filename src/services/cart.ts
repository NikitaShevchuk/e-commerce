import axios from "axios";
import { type ICartItem } from "../types/ICartItem";

const cartInstance = axios.create({
    baseURL: "https://62d8405090883139358e3103.mockapi.io/"
});

export const cartApi = {
    getCart: async () => {
        return await cartInstance.get("cart").then<ICartItem[]>((response) => response.data);
    },
    addCartItem: async (cartItem: ICartItem) => {
        return await cartInstance
            .post("cart", cartItem)
            .then<ICartItem>((response) => response.data);
    },
    removeItem: async (id: string) => {
        return await cartInstance.delete(`cart/${id}`).then<ICartItem>((response) => response.data);
    },
    modifyCartItem: async (cartItem: ICartItem) => {
        return await cartInstance
            .put(`cart/${cartItem.product._id}`, cartItem)
            .then<ICartItem>((response) => response.data);
    }
};
