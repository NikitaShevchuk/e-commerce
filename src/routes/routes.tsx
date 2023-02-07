import React, { Suspense } from "react";
import MainPage from "../pages/Main";
import BasicPreloader from "../components/Loaders/BasicPreloader";
import CategoryProductCardLoader from "../components/Loaders/Category/CategoryProductCardLoader";
import ProductPage from "../pages/ProductPage";
import ProductPageLoader from "../components/Loaders/ProductPageLoader";

const Category = React.lazy(() => import("../pages/Category"));
const Search = React.lazy(() => import("../pages/Search"));

export interface IRoute {
    element: JSX.Element;
    path: string;
    exact?: boolean;
}

export const publicRoutes: IRoute[] = [
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/categories/:categoryId/:categoryName",
        element: (
            <Suspense
                fallback={
                    <BasicPreloader itemsToShow={10}>
                        <CategoryProductCardLoader />
                    </BasicPreloader>
                }
            >
                <Category />
            </Suspense>
        )
    },
    {
        path: "/search/:categoryId/:categoryName",
        element: (
            <Suspense
                fallback={
                    <BasicPreloader itemsToShow={10}>
                        <CategoryProductCardLoader />
                    </BasicPreloader>
                }
            >
                <Search />
            </Suspense>
        )
    },
    {
        path: "/product/:categoryId/:productId",
        element: (
            <Suspense fallback={<ProductPageLoader />}>
                <ProductPage />
            </Suspense>
        )
    }
];
