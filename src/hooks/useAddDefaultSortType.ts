import { useEffect } from "react";
import { productsAPI } from "../services/productsService";
import { useTypedDispatch } from "./redux";

const useAddDefaultSortType = (
    categoryTitle: string | string[] | undefined,
    isSuccess: boolean
) => {
    const dispatch = useTypedDispatch();
    useEffect(() => {
        if (isSuccess && typeof categoryTitle === "string") {
            dispatch(
                productsAPI.util.updateQueryData("getSingleCategory", categoryTitle, (draft) => {
                    const defaultSortType =
                        draft.data.sortBy.find((sort) => sort.property === null) == null;
                    if (defaultSortType) {
                        // Adding first menu item with default sort type
                        draft.data.sortBy.unshift({ property: null, order: null });
                    }
                })
            );
        }
    }, [isSuccess]);
};

export default useAddDefaultSortType;
