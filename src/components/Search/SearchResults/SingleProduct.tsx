import { Typography } from "@mui/material";
import Link from "next/link";
import React, { type FC } from "react";
import { useTypedDispatch } from "@/hooks/redux";
import { setIsSearchActive } from "@/store/slices/search";
import Skeleton from "react-loading-skeleton";

interface Props {
    productName?: string;
    productColor?: string;
    productId?: string;
}

const SingleProduct: FC<Props> = ({ productName, productColor, productId }) => {
    const dispatch = useTypedDispatch();
    const handleClick = () => dispatch(setIsSearchActive(false));
    return (
        <Link
            href={`product/${productId ?? ""}`}
            className="search-result-product"
            onClick={handleClick}
        >
            <Typography textAlign="left" sx={{ py: 1 }}>
                {productName ?? <Skeleton width="150px" inline />} -{" "}
                {productColor ?? <Skeleton width="100px" inline />}
            </Typography>
        </Link>
    );
};

export default SingleProduct;
