import React, {FC} from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {IProductCard} from "../../models/IProductCard";
import ProductCardHeader from "./ProductCardHeader";
import ProductSizes from "./ProductSizes";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {addToCart, SelectedCartItem} from "../../store/slices/cartSlice/cartThunk";
import {useModifyFavoriteMutation} from "../../services/productsService";
import {getFilters} from "../../store/selectors/filter";

interface Props {
    product: IProductCard
}

const ProductCard: FC<Props> = ({product}) => {
    const [selectedSize, setSelectedSize] = React.useState('')
    const dispatch = useTypedDispatch()
    const addToCardOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
    const [modifyFavorite, {isLoading}] = useModifyFavoriteMutation()
    let {categoryId} = useParams()
    const {requestQuery} = useTypedSelector(getFilters)
    const toggleFavorite = () => {
        if (!categoryId) return
        const updatedProduct: IProductCard = {
            ...product,
            isFavorite: !product.isFavorite
        }
        const modifierArgs = {
            filters: requestQuery, categoryId, updatedProduct
        }
        if (!isLoading) modifyFavorite(modifierArgs)
    }
    return (
        <Card className='product-card'>
            <ProductCardHeader
                isNew={product.isNew}
                isFavorite={product.isFavorite}
                toggleFavorite={toggleFavorite}
            />
            <NavLink to={`/productName`} >
                <div className="image-wrapper">
                    <CardMedia
                        component='img'
                        image={product.image}
                        alt='product card'
                    />
                    <ProductSizes
                        sizes={product.sizes}
                        setSelectedSize={setSelectedSize}
                        selectedSize={selectedSize}
                        addToCart={addToCardOnClick}
                    />
                </div>
                <CardContent sx={{px: 0}}>
                    <Typography
                        component='div'
                        gutterBottom
                        variant='h3'
                    >
                        {product.name}
                    </Typography>
                    <Typography
                        component='div'
                        variant='caption'
                    >
                        ${product.price}
                    </Typography>
                </CardContent>
            </NavLink>
        </Card>
    );
};

export default ProductCard;
