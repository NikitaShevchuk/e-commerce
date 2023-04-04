import ProductPageLoader from "@/components/Loaders/ProductPageLoader";
import ProductSizes from "@/features/ProductSizes";
import { useGetSingleProductQuery } from "@/services/productsService";
import { Card, CardMedia, Divider, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

export interface ProductQueryParams {
    productId: string;
    categoryId: string;
}

export function ProductPage() {
    const router = useRouter();
    const { categoryId, productId } = router.query;
    const productQueryParams = { categoryId, productId } as ProductQueryParams;

    const { data: product, isLoading } = useGetSingleProductQuery(
        typeof categoryId === "string" && typeof productId === "string"
            ? productQueryParams
            : skipToken,
        { skip: router.isFallback }
    );

    if (isLoading || router.isFallback) return <ProductPageLoader />;

    return (
        <Card className="flex transparent-background" sx={{ justifyContent: "flex-start" }}>
            <Head>
                <title>{product?.name || "Product"}</title>
            </Head>
            <CardMedia image={product?.image} component="img" className="product-page__image" />

            <div className="product-page__description">
                <div className="flex mb-20">
                    <Typography component="div" variant="h4" sx={{ maxWidth: "80%" }}>
                        {product?.name}
                    </Typography>
                    <Typography component="div" variant="h3">
                        ${product?.price}
                    </Typography>
                </div>
                <Divider />
                <Typography mt={1} gutterBottom fontSize="small" textAlign="left">
                    {product?.description}
                </Typography>
                <ProductSizes
                    product={product}
                    sizesPosition="static"
                    colorVariant="gold"
                    queryParams=""
                />
            </div>
        </Card>
    );
}
