import React from 'react';
import ProductList from "../../containers/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
    return (
        <React.Fragment>
            <div className="container" style={{paddingTop: '6rem'}} >
                <div className="row">
                  
                    <ProductList/>
                </div>
            </div>
        </React.Fragment>
    );
};


export default Home;
