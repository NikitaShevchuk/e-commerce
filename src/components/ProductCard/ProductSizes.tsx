import React, {FC} from 'react';
import {Paper, Stack, Typography} from "@mui/material";

interface Props {
    sizes: string[]
}

const ProductSizes: FC<Props> = ({sizes}) => {
    return (
        <div className='product-sizes'>
            <Stack
                direction="row"
                justifyContent='center'
                spacing={1}
            >
                {sizes && sizes.map( (size, index) =>
                    size
                    ?<Paper key={size} className='product-sizes__item'>{size}</Paper>
                    :<Paper key={index} className='product-sizes__item inactive'>Not in stock</Paper>
                )}
                {!sizes && 'There is no sizes available'}
            </Stack>
            <Typography
                variant='caption'
                sx={{
                    mt: '15px',
                    textAlign: 'center'
                }}
                component='div'
            >
                Select a size
            </Typography>
        </div>
    );
};

export default ProductSizes;