import { useEffect } from "react";
import { ICategory } from "../models/ICategory";
import { productsAPI } from "../services/productsService";
import { useTypedDispatch } from "./redux";

const useAddDefaultSortType = (categoryId: string | string[] | undefined, isSuccess: boolean) => {
    const dispatch = useTypedDispatch();
    useEffect(() => {
        if (isSuccess && typeof categoryId === "string") {
            dispatch(
                productsAPI.util.updateQueryData(
                    "getSingleCategory",
                    categoryId,
                    (draft: ICategory) => {
                        const defaultSortType = !draft.sortBy.find(
                            (sort) => sort.property === null
                        );
                        if (defaultSortType) {
                            // Adding first menu item with default sort type
                            draft.sortBy.unshift({ property: null, order: null });
                        }
                    }
                )
            );
        }
    }, [isSuccess]);
};

export default useAddDefaultSortType;
