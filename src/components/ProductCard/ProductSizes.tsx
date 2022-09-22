import React, {FC} from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";

interface Props {
    sizes: string[]
    setSelectedSize: (size: string) => void
    selectedSize: string
    addToCart: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ProductSizes: FC<Props> = ({sizes, setSelectedSize, selectedSize, addToCart}) => {
    const handleSizeClick = (e: React.MouseEvent<HTMLDivElement>, size: string) => {
        e.preventDefault()
        if (size === selectedSize) return setSelectedSize('')
        setSelectedSize(size)
    }
    const mapProducts = (size: string, i: number) => {
        const paperClassName = size === selectedSize
            ? 'product-sizes__item active'
            : 'product-sizes__item'
        if (size) return (
            <Paper
                onClick={(e) => handleSizeClick(e, size)}
                key={size}
                className={paperClassName}
            >
                {size}
            </Paper>
        )
        else return (
            <Paper
                key={i}
                className='product-sizes__item inactive'
            >
                Not in stock
            </Paper>
        )

    }
    const sizeItems = React.useMemo(
        () => sizes ? sizes.map(mapProducts) : [],
        [sizes, selectedSize]
    )
    return (
        <div className='product-sizes'>
            <Stack
                direction="row"
                justifyContent='center'
                spacing={1}
            >
                <>{sizes ? sizeItems : 'No sizes available'}</>
            </Stack>
            {selectedSize
                ? <Button
                      sx={{mt: 2}}
                      variant='contained'
                      size='small'
                      onClick={addToCart}
                  >
                      Add to cart
                  </Button>

                : <Typography
                      variant='caption'
                      sx={{ mt: 2, textAlign: 'center'}}
                      component='div'
                  >
                      Select a size
                  </Typography>
            }

        </div>
    );
};

export default ProductSizes;