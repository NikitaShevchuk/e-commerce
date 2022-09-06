import React from 'react';
import cartIsEmptyImg from '../../assets/img/products/Empty-Cart.webp'
import {Stack, Typography} from "@mui/material";

const CartIsEmpty = () => {
    return (
        <Stack
            direction='column'
            alignItems='center'
            justifyContent='center'
            height='70%'
        >
            <img
                src={cartIsEmptyImg}
                alt="Empty cart"
                className='empty-cart-image'
            />
            <Typography>
                There are currently no items in your cart.
            </Typography>
        </Stack>
    );
};

export default CartIsEmpty;