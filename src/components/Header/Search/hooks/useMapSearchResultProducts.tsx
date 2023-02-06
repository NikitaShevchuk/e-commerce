import React from "react";
import SingleProduct from "../SearchResults/SingleProduct";
import { IProductCard } from "../../../../models/IProductCard";

export const useMapSearchResultProducts = (products: IProductCard[] | undefined) =>
    React.useMemo(() => {
        if (products)
            return products.map((product) => (
                <SingleProduct
                    key={product.id}
                    productName={product.name}
                    productColor={product.color}
                    productId={product.id}
                    categoryId={product.categoryId}
                />
            ));
        else return [];
    }, [products]);
