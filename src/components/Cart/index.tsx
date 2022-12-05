import React from 'react';
import {Modal, Paper} from "@mui/material";
import HeaderWithClose from "../common/HeaderWithClose";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {RequestStatus, setIsCartModalOpened} from "../../store/slices/cartSlice";
import LoadingError from "../LoadingError";
import CartSingleItem from "./CartSingleItem";
import CartIsEmpty from "./CartIsEmpty";
import {cartSelector} from "../../store/selectors/cart";
import {getCartItems} from "../../store/slices/cartSlice/cart-thunks";
import CartError from "./CartError";
import BasicPreloader from "../Loaders/BasicPreloader";
import CartItemLoader from "../Loaders/CartItemLoader";
import CartFooter from "./CartFooter";

const Cart = () => {
    const {isCartModalOpened} = useTypedSelector(state => state.cartSlice)
    const {cartItems, status, cartItemsCount} = useTypedSelector(cartSelector);
    const dispatch = useTypedDispatch()
    React.useEffect(() => {dispatch(getCartItems())},[])
    const handleClose = () => dispatch(setIsCartModalOpened(false))
    const reload = () => dispatch(getCartItems())
    const title = React.useMemo(
        () => status.getCartItems === RequestStatus.loading
            ? 'Loading your shopping cart'
            : `${cartItemsCount} items in your cart`
        ,
        [cartItemsCount, status.getCartItems]
    )
    const total = React.useMemo(
        () => cartItems
            ? cartItems.reduce(
                (prev, current) => prev + Number(current.price), 0
              )
            : 0,
    [cartItems])
    const items = React.useMemo(
        () => {
            if (cartItems) return cartItems.map( item =>
                <CartSingleItem
                    key={item.name + item.size}
                    cartItem={item}
                />
            )
            else return []
        },
        [cartItems]
    )
    return (
        <Modal
            open={isCartModalOpened}
            onClose={handleClose}
            keepMounted
        >
            <Paper className='modal-window'>
                <HeaderWithClose
                    title={title}
                    handleClose={setIsCartModalOpened}
                />

                <div className="cart-items-wrapper">
                    {status.getCartItems === RequestStatus.fulfilled &&
                        <>{items}</>
                    }
                    {status.getCartItems === RequestStatus.error &&
                        <LoadingError reload={reload} />
                    }
                    {status.getCartItems === RequestStatus.loading &&
                        <BasicPreloader itemsToShow={4}>
                            <CartItemLoader />
                        </BasicPreloader>
                    }
                    {status.addCartItem === RequestStatus.loading &&
                        <CartItemLoader />
                    }
                    {status.getCartItems !== RequestStatus.error && cartItemsCount < 1 &&
                        <CartIsEmpty />
                    }
                </div>
                <CartError />
                <CartFooter
                    handleClose={handleClose}
                    total={total}
                />
            </Paper>
        </Modal>
    );
};

export default Cart;