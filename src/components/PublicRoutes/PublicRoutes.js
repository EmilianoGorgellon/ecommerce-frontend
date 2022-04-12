import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Payment from '../Payment/Payment';
import Product from '../Product/Product';
import Categories from '../Categories/Categories';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Backoffice from '../backoffice/Backoffice';
const PublicRoutes = () => {
    return (
        <>  
            <Header />
            {/* <Switch> */}
                <Route path="/search/:searchProducts" component={Search} /> 
                <Route path="/payment" component={Payment} />
                <Route path="/product/:name" component={Product} />
                <Route path="/category/:category" component={Categories} />
                {/* <Route path="/sendProduct" element={<FormProduct />} /> */}
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/backoffice" component={Backoffice} />
                <Route exact path='/' component={Home} />
            {/* </Switch> */}
        </>
    )
}

export default PublicRoutes
