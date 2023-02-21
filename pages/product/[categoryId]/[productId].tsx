import { ProductPage } from "@/pages/ProductPage";
import { getRunningQueriesThunk, getSingleProduct } from "@/services/productsService";
import { wrapper } from "@/store/store";

export default ProductPage

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const categoryId = context.query?.categoryId;
        const productId = context.query?.productId;

        if (typeof categoryId === 'string' && typeof productId === 'string') {
            store.dispatch(getSingleProduct.initiate({ categoryId, productId }))
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));
        return { props: {} }
    }
)

