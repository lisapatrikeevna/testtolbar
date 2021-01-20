import React from 'react'
import ProductList from "./common/productList/productList"
import Toolbar from "./common/toolbar/toolbar"
import cl from './ChangeProductsPage.module.css'
import ItemProduct from "./common/productList/itemProduct";
const ChangeProductsPage = () => {
    return (
        <div>
            <div className={cl.wrapOld}>
                <Toolbar/>
                <ProductList/>
            </div>
            <ItemProduct/>
        </div>
    );
};

export default ChangeProductsPage;