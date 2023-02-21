import CategoryPage from "@/pages/CategoryPage";
import { getCategories, getRunningQueriesThunk, getSingleCategory } from "@/services/productsService";
import { wrapper } from "@/store/store";

export default CategoryPage

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const categoryId = context.query?.categoryId;
    const productId = context.query?.productId;

    if (typeof categoryId === 'string' && typeof productId === 'string') {
        store.dispatch(getSingleCategory.initiate(categoryId))
        store.dispatch(getCategories.initiate(""))
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} }
})
