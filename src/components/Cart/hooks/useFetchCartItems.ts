import { useTypedDispatch } from "@/hooks/redux";
import { getCartItems } from "@/store/slices/cartSlice/cart-thunks";
import React from "react";

export const useFetchCartItems = () => {
    const dispatch = useTypedDispatch();
    React.useEffect(() => {
        void dispatch(getCartItems());
    }, []);
};
