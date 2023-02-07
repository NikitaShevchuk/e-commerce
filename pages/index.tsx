import Banner from "@/components/Banner";
import CategoryBlock from "@/components/CategoryBlock";
import ProductsSlider from "@/components/ProductsSlider";

export default function Home() {
    return (
        <main>
            <Banner />
            <ProductsSlider blockTitle="New collection" queryParams="1/1?isNew=true" />
            <CategoryBlock />
        </main>
    );
}
