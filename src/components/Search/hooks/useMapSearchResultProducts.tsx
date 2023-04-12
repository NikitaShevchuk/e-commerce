import React from "react";
import SingleProduct from "../SearchResults/SingleProduct";
import { type IProductCard } from "../../../types/IProductCard";

export const useMapSearchResultProducts = (products: IProductCard[] | undefined) =>
    React.useMemo(() => {
        if (products != null)
            return products.map((product) => (
                <SingleProduct
                    key={product._id}
                    productName={product.title}
                    productColor={product.color}
                    productId={product._id}
                />
            ));
        else return [];
    }, [products]);
