import { type CartProduct } from "@/types/CartProduct";
import React from "react";

export const useGetTotal = (cartItems: CartProduct[] | null) =>
    React.useMemo(
        () =>
            cartItems != null
                ? cartItems.reduce((prev, current) => prev + Number(current.price), 0)
                : 0,
        [cartItems]
    );
