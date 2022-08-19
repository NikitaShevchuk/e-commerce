import React, {FC} from 'react';
import {Typography} from "@mui/material";
import {useTypedDispatch} from "../../../hooks/redux";
import {setIsSearchActive} from "../../../store/slices/searchSlice";
import {NavLink} from "react-router-dom";

interface Props {
    productName: string
    productColor: string
}

const SearchResultProduct: FC<Props> = ({productName, productColor}) => {
    const dispatch = useTypedDispatch()
    const handleClick = () => dispatch(setIsSearchActive(false))
    return (
        <NavLink
            to={`/product/${productName}`}
            className='search-result-product'
            onClick={handleClick}
        >
            <Typography textAlign='left' sx={{py: 1}}>
                {productName} - {productColor}
            </Typography>
        </NavLink>
    );
};

export default SearchResultProduct;