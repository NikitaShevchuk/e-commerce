import { ProductPage } from "@/pages/ProductPage";
import { getRunningQueriesThunk, getSingleProduct } from "@/services/products";
import { wrapper } from "@/store/store";

export default ProductPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const productId = context.params?.productId;

    if (typeof productId === "string") {
        void store.dispatch(getSingleProduct.initiate({ productId }));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} };
});
