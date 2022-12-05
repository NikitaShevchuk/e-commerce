import React, {FC} from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {useGetSizeItems} from '../../components/ProductCard/useGetSizeItems';
import AddToCartButton, {ColorVariant} from './AddToCartButton';
import classNames from 'classnames'
import {useTypedDispatch} from '../../hooks/redux';
import {addToCart, SelectedCartItem} from '../../store/slices/cartSlice/cart-thunks';
import {IProductCard} from '../../models/IProductCard';
import ToggleFavorite from '../ToggleFavorite';
import {ProductQueryParams} from '../../pages/ProductPage';

type SizesPosition = 'static' | 'absolute'

interface Props {
    sizesPosition: SizesPosition
    colorVariant: ColorVariant
    product: IProductCard | undefined
    queryParams: string | ProductQueryParams
}

const ProductSizes: FC<Props> = ({
    sizesPosition, colorVariant, product, queryParams
}) => {

    const [selectedSize, setSelectedSize] = React.useState('')
    const dispatch = useTypedDispatch()
    const addToCartOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!product || !selectedSize) return
        const selectedCartItem: SelectedCartItem = {
            newCartItem: {
                name: product.name,
                price: product.price,
                image: product.image,
                color: product.color,
                createdAt: product.createdAt
            },
            size: selectedSize
        }
        dispatch(addToCart(selectedCartItem))
    }
    const sizeItems = useGetSizeItems(product?.sizes, selectedSize, setSelectedSize)

    const blockPosition: string = (sizesPosition === 'absolute')
        ? 'absolute-position'
        : 'static-position'

    return (
        <div
            className={classNames(blockPosition, 'product-sizes')}
        >
            <Stack
                direction="row"
                justifyContent='center'
                spacing={1}
            >
                <>{product?.sizes ? sizeItems : 'No sizes available'}</>
            </Stack>
            <div className="flex" >
                {selectedSize
                    ? <AddToCartButton
                        addToCart={addToCartOnClick}
                        colorVariant={colorVariant}
                      />

                    : <Typography
                          variant='caption'
                          sx={{textAlign: 'center'}}
                          component='div'
                      >
                          Select a size
                      </Typography>
                }
                <ToggleFavorite
                    product={product}
                    colorVariant={colorVariant}
                    queryParams={queryParams}
                />
            </div>
        </div>
    );
};

export default ProductSizes;

