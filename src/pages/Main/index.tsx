import React from "react";
import Banner from "../../components/Banner";
import ProductsSlider from "../../components/ProductsSlider";
import CategoryBlock from "../../components/CategoryBlock";

const MainPage = () => {
    return (
        <>
            <Banner />
            <ProductsSlider blockTitle="New collection" queryParams="1/1?isNew=true" />
            <CategoryBlock />
        </>
    );
};

export default MainPage;
