import {useEffect} from "react";
import {productsAPI} from "../services/productsService";
import {ICategory} from "../models/ICategory";
import {useTypedDispatch} from "./redux";

const useAddDefaultSortType = (categoryId: string, isSuccess: boolean) => {
    const dispatch = useTypedDispatch()
    useEffect( () => {
        if (isSuccess) dispatch(
            productsAPI.util.updateQueryData('getSingleCategory', categoryId, (draft: ICategory) => {
                if (!draft.sortBy.find( sort => sort.property === null )) {    // Find out if there is a default sort type
                    draft.sortBy.unshift({property: null, order: null}) // Adding first menu item with default sort type
                }
            })
        )
    },[isSuccess])
}

export default useAddDefaultSortType;