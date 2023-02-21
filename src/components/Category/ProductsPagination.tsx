import { Pagination } from "@mui/material";
import React from "react";
import { useTypedDispatch } from "../../hooks/redux";
import { setCurrentPage } from "../../store/slices/filterSlice";
import { useProductsPagination } from "./hooks/useProductsPagination";

const ProductsPagination = () => {
    const dispatch = useTypedDispatch();
    const handleChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    };
    const { currentPage, pagesCount } = useProductsPagination()

    if (pagesCount < 2) return <span></span>;

    return (
        <Pagination
            count={+pagesCount}
            defaultPage={+currentPage}
            page={+currentPage}
            sx={{ mb: 6, mt: 3 }}
            onChange={handleChange}
        />
    );
};

export default ProductsPagination;
