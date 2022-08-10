import React, {Suspense} from "react";
import MainPage from "../pages/Main";
import {Navigate} from "react-router-dom";

const Category = React.lazy(() => import('../pages/Category'))

export interface IRoute {
    element: JSX.Element
    path: string
    exact?: boolean
}

export const publicRoutes: IRoute[] = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/categories/:categoryId/:categoryName',
        element: <Suspense fallback={'loading...'}><Category /></Suspense>
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
]