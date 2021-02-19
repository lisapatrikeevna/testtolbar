import React from 'react'
import ProductList from "./common/productList/productList"
import Toolbar from "./common/toolbar/toolbar"
import cl from './ChangeProductsPage.module.css'
import NewProduct from "./common/productList/newProduct"

const ChangeProductsPage = () => {
    return (
        <div>
            <NewProduct/>
            <div className={cl.wrapOld}>
                <Toolbar/>
                <ProductList/>
            </div>

        </div>
    );
};

export default ChangeProductsPage;