import React from 'react';
import ProductList from './ProductList.jsx';
import ProductDetail from './ProductDetail';
const Product = (props) => {
    const showCpnByType = () => {
        if(props.history.location.pathname === '/product/list'){
            return <ProductList />
        }else {
            return <ProductDetail />
        }
    }
    return (
        <div>
            {showCpnByType()}
        </div>
    )
}

export default Product;