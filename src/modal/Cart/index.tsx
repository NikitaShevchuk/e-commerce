import { Modal, Paper } from "@mui/material";
import React, { type FC } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { cartSelector } from "../../store/selectors/cart";
import { getCartItems } from "../../store/slices/cart/thunks";
import { RequestStatus } from "../../store/slices/cart/Types";
import HeaderWithClose from "../../components/common/HeaderWithClose";
import BasicPreloader from "../../components/Loaders/BasicPreloader";
import CartItemLoader from "../../components/Loaders/CartItemLoader";
import LoadingError from "../../components/LoadingError";
import CartError from "./CartError";
import CartFooter from "./CartFooter";
import CartIsEmpty from "./CartIsEmpty";
import { useFetchCartItems } from "./hooks/useFetchCartItems";
import { useGetCartProducts } from "./hooks/useGetCartProducts";
import { useGetTotal } from "./hooks/useGetTotal";

interface Props {
    isOpened: boolean;
    close: () => void;
}

const Cart: FC<Props> = ({ isOpened, close }) => {
    const { cartItems, status } = useTypedSelector(cartSelector);

    useFetchCartItems();

    const title =
        status.getCartItems === RequestStatus.loading
            ? "Loading your shopping cart"
            : `${cartItems?.length ?? "0"} items in your cart`;
    const total = useGetTotal(cartItems);
    const cartProducts = useGetCartProducts(cartItems);

    const reload = async () => {
        void dispatch(getCartItems());
    };
    const dispatch = useTypedDispatch();

    return (
        <Modal open={isOpened} onClose={close} keepMounted>
            <Paper className="modal-window">
                <HeaderWithClose title={title} close={close} />

                <div className="cart-items-wrapper">
                    {status.getCartItems === RequestStatus.fulfilled && <>{cartProducts}</>}
                    {status.getCartItems === RequestStatus.error && (
                        <LoadingError reload={reload} />
                    )}
                    {status.getCartItems === RequestStatus.loading && (
                        <BasicPreloader itemsToShow={4}>
                            <CartItemLoader />
                        </BasicPreloader>
                    )}
                    {status.addCartItem === RequestStatus.loading && <CartItemLoader />}
                    {status.getCartItems !== RequestStatus.error &&
                    (cartItems === null || cartItems?.length < 1) ? (
                        <CartIsEmpty />
                    ) : null}
                </div>
                <CartError />
                <CartFooter handleClose={close} total={total} />
            </Paper>
        </Modal>
    );
};

export default Cart;
