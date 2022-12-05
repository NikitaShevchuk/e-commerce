import React from 'react';
import Header from "../Header/Header";
import SaleBlock from "../Header/SaleBlock";
import {publicRoutes} from "../../routes/routes";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header />
        <SaleBlock />
        <Routes>
            {publicRoutes.map( route => <Route {...route} key={route.path} />)}
        </Routes>
    </div>
  );
}

export default App;
