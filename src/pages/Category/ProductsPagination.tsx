import React from 'react';
import {Pagination} from "@mui/material";
import {setCurrentPage} from "../../store/slices/filterSlice";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {useGetProductCardsQuery} from "../../services/productsService";
import {getFilters} from "../../store/selectors/filter";

const ProductsPagination = () => {
    const {currentPage, requestQuery, itemsLimit} = useTypedSelector(getFilters)
    const {data: productsArray} = useGetProductCardsQuery(requestQuery)
    let [pagesCount, setPagesCount] = React.useState(1)
    React.useEffect( () => {
        if (productsArray) setPagesCount( Math.floor(productsArray.length / itemsLimit) )
    }, [productsArray, itemsLimit] )
    const dispatch = useTypedDispatch()
    const handleChange = ( e: React.ChangeEvent<unknown>, pageNumber: number ) => {
        dispatch(setCurrentPage(pageNumber))
    }
    if (pagesCount < 2) return <span></span>
    return (
        <Pagination count={pagesCount} page={currentPage} sx={{mb: 6}} onChange={handleChange}/>
    );
};

export default ProductsPagination;