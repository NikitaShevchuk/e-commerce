import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useTypedDispatch } from "../../../../hooks/redux";
import { setIsSearchActive } from "../../../../store/slices/searchSlice";
import { NavLink } from "react-router-dom";

interface Props {
    productName: string;
    productColor: string;
    productId: string;
    categoryId: string;
}

const SingleProduct: FC<Props> = ({ productName, productColor, productId, categoryId }) => {
    const dispatch = useTypedDispatch();
    const handleClick = () => dispatch(setIsSearchActive(false));
    return (
        <NavLink
            to={`/${categoryId}/${productId}`}
            className="search-result-product"
            onClick={handleClick}
        >
            <Typography textAlign="left" sx={{ py: 1 }}>
                {productName} - {productColor}
            </Typography>
        </NavLink>
    );
};

export default SingleProduct;
