import React, {FC} from 'react';
import {Button, Typography} from "@mui/material";

interface Props {
    handleClose: () => void
    total: number
}

const CartFooter: FC<Props> = ({handleClose, total}) => {
    return (
        <div className='cart-footer'>
            <div className="flex">
                <Typography>Total price:</Typography>
                <Typography>${total}</Typography>
            </div>
            <Button
                variant='contained'
                href='/checkout'
                sx={{mb: 1, mt: 2}}
                fullWidth
            >
                Checkout
            </Button>
            <Button
                variant='outlined'
                onClick={handleClose}
                fullWidth
            >
                Continue chopping
            </Button>
        </div>
    );
};

export default CartFooter