import Cart from "@/modal/Cart";
import { useTypedSelector } from "@/hooks/redux";
import React from "react";
import { Link as MaterialLink } from "@mui/material";

const CartLink = () => {
    const { cartItemsCount } = useTypedSelector((state) => state.cartSlice);
    const [isOpened, setIsOpened] = React.useState(false);
    const open = () => {
        setIsOpened(true);
    };
    const close = () => {
        setIsOpened(false);
    };
    return (
        <>
            <MaterialLink className="link" onClick={open}>
                Cart({cartItemsCount})
            </MaterialLink>
            <Cart close={close} isOpened={isOpened} />
        </>
    );
};

export default CartLink;
