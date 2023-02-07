import { CartProduct } from "@/models/CartProduct";
import React from "react";
import CartSingleItem from "../CartSingleItem";

export const useGetCartProducts = (cartItems: CartProduct[] | null) => {
    return React.useMemo(() => {
        if (cartItems)
            return cartItems.map((item) => (
                <CartSingleItem key={item.name + item.size} cartItem={item} />
            ));
        else return [];
    }, [cartItems]);
};
