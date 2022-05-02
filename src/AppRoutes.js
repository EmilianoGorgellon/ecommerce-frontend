import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Payment from './components/Payment/Payment';
import Product from './components/Product/Product';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Backoffice from './components/backoffice/Backoffice';
import { useSelector } from 'react-redux';
import { useJwt } from 'react-jwt';
const AppRoutes = () => {
  const [isAdmin, setIsAdmin] = useState([]);
  const get_token = useSelector(state => state.getToken);
  const { decodedToken } = useJwt(get_token);
  console.log(get_token)
  console.log(decodedToken)
  useEffect(() => {
    console.log("AHORA LEO POR ACA")
    // setIsAdmin(decodedToken.name.isAdmin)
  }, [get_token])
  // setIsAdmin(decodedToken)
  return (
    <BrowserRouter>
      {/* <PublicRoutes path="/"/> */}
        <Header />
      {/* <Switch> */}
            <Route path="/search/:searchProducts" component={Search} /> 
            <Route path="/payment" component={Payment} />
            <Route path="/product/:name" component={Product} />
            <Route path="/category/:category" component={Categories} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path='/' component={Home} />
            {/* <Route path="/sendProduct" element={<FormProduct />} /> */}
            {/* {isAdmin ? <Route path="/backoffice" component={Backoffice} /> : null} */}
        {/* </Switch> */}
      
    </BrowserRouter>
  )
}

export default AppRoutes

