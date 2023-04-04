import Banner from "@/components/Banner";
import CategoryBlock from "@/components/CategoryBlock";
import ProductsSlider from "@/components/ProductsSlider";
import { getCategories, getProductCards, getRunningQueriesThunk } from "@/services/productsService";
import { wrapper } from "@/store/store";
import Head from "next/head";
import { type FC } from "react";

const mainPageSliderParams = "";

interface Props {
    mainPageSliderParams: string;
}

const Home: FC<Props> = ({ mainPageSliderParams }) => {
    return (
        <main>
            <Head>
                <title>E-commerce</title>
            </Head>
            <Banner />
            <ProductsSlider blockTitle="New collection" queryParams={mainPageSliderParams} />
            <CategoryBlock />
        </main>
    );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch(getCategories.initiate(""));
    store.dispatch(getProductCards.initiate(mainPageSliderParams));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: { mainPageSliderParams } };
});
