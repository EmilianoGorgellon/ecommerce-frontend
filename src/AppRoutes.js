import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Payment from './components/Payment/Payment';
import Product from './components/Product/Product';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Settings from './components/Settings/Settings';
import ProductBack from './components/Backoffice/ProductBack';
import AdministradorBack from './components/Backoffice/AdministradorBack';
import PageNotFound from './components/PageNotFound/PageNotFound';
const AppRoutes = () => {
  return (
    <Router>
      <Header /> 
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/search/:searchProducts" component={Search} /> 
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/product/:name" component={Product} />
        <Route exact path="/category/:category" component={Categories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/backoffice/product" component={ProductBack} />
        <Route exact path="/backoffice/admin" component={AdministradorBack} />
        <Route path='*' component={PageNotFound} />
        {/* <Route path="/sendProduct" element={<FormProduct />} /> */}
      </Switch>
    </Router>
  )
}

export default AppRoutes

