import React from 'react';
import {Card, CardMedia, Divider, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import { useGetSingleProductQuery } from '../../services/productsService';
import ProductSizes from '../../features/ProductSizes';
import ProductPageLoader from '../../components/Loaders/ProductPageLoader';

export interface ProductQueryParams {
    productId: string
    categoryId: string
}

const ProductPage = () => {
    const {categoryId, productId} = useParams()
    const productQueryParams: ProductQueryParams = {
        categoryId: categoryId ? categoryId : '1',
        productId: productId ? productId : '1'
    }
    const {data: product, isLoading} = useGetSingleProductQuery(productQueryParams)
    if (isLoading) return <ProductPageLoader />
    return (
        <Card 
            className='flex transparent-background'
            sx={{justifyContent: 'flex-start'}}
        >
            <CardMedia 
                image={product?.image} 
                component='img'
                className='product-page__image'
            />
            
            <div className="product-page__description">
                <div className="flex mb-20">
                    <Typography
                        component='div'
                        variant='h4'
                        sx={{maxWidth: '80%'}}
                    >
                        {product?.name}
                    </Typography>
                    <Typography
                        component='div'
                        variant='h3'
                    >
                        ${product?.price}
                    </Typography>
                    </div>
                <Divider />
                <Typography 
                    mt={1}
                    gutterBottom
                    fontSize='small'
                    textAlign='left'
                >
                    {product?.description}
                </Typography>
                <ProductSizes
                    product={product}
                    sizesPosition='static'
                    colorVariant='gold'
                    queryParams=''
                />
            </div>
        </Card>
    );
};

export default ProductPage;