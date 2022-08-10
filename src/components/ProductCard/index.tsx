import React, {FC} from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {IProductCard} from "../../models/IProductCard";
import ProductCardHeader from "./ProductCardHeader";
import ProductSizes from "./ProductSizes";

const ProductCard: FC<IProductCard> = ({name, price, image, isNew, isFavorite, sizes}) => {
    return (
        <Card className='product-card'>
            <ProductCardHeader isNew={isNew} isFavorite={isFavorite} />
            <NavLink to={`/productName`} >
                <div className="image-wrapper">
                    <CardMedia
                        component='img'
                        image={image}
                        alt='product card'
                    />
                    <ProductSizes sizes={sizes} />
                </div>
                <CardContent sx={{px: 0}}>
                    <Typography
                        component='div'
                        gutterBottom
                        variant='h3'
                    >
                        {name}
                    </Typography>
                    <Typography
                        component='div'
                        variant='caption'
                    >
                        ${price}
                    </Typography>
                </CardContent>
            </NavLink>
        </Card>
    );
};

export default ProductCard;
