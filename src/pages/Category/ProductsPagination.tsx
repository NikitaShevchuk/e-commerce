import React from 'react';
import {Pagination} from "@mui/material";
import {setCurrentPage} from "../../store/slices/filterSlice";
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux";
import {useGetProductCardsQuery} from "../../services/productsService";
import {getFilters} from "../../store/selectors/filter";

const ProductsPagination = () => {
    const {currentPage, requestQuery, itemsLimit} = useTypedSelector(getFilters)
    // change limit to see how many pages to show
    // P.S. API doesn't return the amount of products
    const {data: productsArray} = useGetProductCardsQuery(
        requestQuery.replace( `p=${currentPage}&l=${itemsLimit}`, 'p=1&l=999' )
    )
    let [pagesCount, setPagesCount] = React.useState(1)
    React.useEffect( () => {
        const totalPages = productsArray ? Math.ceil(productsArray.length / itemsLimit) : 1
        setPagesCount( totalPages )
    }, [productsArray, itemsLimit] )
    const dispatch = useTypedDispatch()
    const handleChange = ( e: React.ChangeEvent<unknown>, pageNumber: number ) => {
        dispatch(setCurrentPage(pageNumber))
    }
    if (pagesCount < 2) return <span></span>
    return (
        <Pagination
            count={+pagesCount}
            defaultPage={+currentPage}
            page={+currentPage}
            sx={{mb: 6, mt: 3}}
            onChange={handleChange}
        />
    );
};

export default ProductsPagination;