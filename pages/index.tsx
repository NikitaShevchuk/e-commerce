import Banner from "@/components/Banner";
import CategoryBlock from "@/components/CategoryBlock";
import ProductsSlider from "@/components/ProductsSlider";
import { getCategories, getProductCards, getRunningQueriesThunk } from "@/services/productsService";
import { wrapper } from "@/store/store";
import Head from "next/head";

const mainPageSliderParams = "1/1?isNew=true"

export default function Home() {
    return (
        <main>
            <Head><title>E-commerce</title></Head>
            <Banner />
            <ProductsSlider blockTitle="New collection" queryParams={mainPageSliderParams} />
            <CategoryBlock />
        </main>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {

    store.dispatch(getCategories.initiate(""))
    store.dispatch(getProductCards.initiate(mainPageSliderParams))

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: {} }
})