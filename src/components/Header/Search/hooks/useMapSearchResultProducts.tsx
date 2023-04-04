import React from "react";
import SingleProduct from "../SearchResults/SingleProduct";
import { type IProductCard } from "../../../../types/IProductCard";

export const useMapSearchResultProducts = (products: IProductCard[] | undefined) =>
    React.useMemo(() => {
        if (products != null)
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
