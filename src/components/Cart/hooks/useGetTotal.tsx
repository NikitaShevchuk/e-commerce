import { CartProduct } from "@/models/CartProduct";
import React from "react";

export const useGetTotal = (cartItems: CartProduct[] | null) =>
    React.useMemo(
        () =>
            cartItems ? cartItems.reduce((prev, current) => prev + Number(current.price), 0) : 0,
        [cartItems]
    );
