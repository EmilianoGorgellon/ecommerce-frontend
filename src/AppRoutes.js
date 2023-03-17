import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Payment from './components/Payment/Payment';
import Product from './components/Product/Product';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Settings from './components/Settings/Settings';
import AddProductBackoffice from './components/Backoffice/AddProductBackoffice/AddProductBackoffice';
import AdministradorBack from './components/Backoffice/AdminBackoffice/AdministradorBack';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import EditProduct from './components/Backoffice/EditProduct/EditProduct';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure/PaymentFailure';
import ModeratorBack from "./components/Backoffice/ModeratorBackOffice/ModeratorBack";
import NewUser from "./components/NewUser/NewUser"
import Spinner from './components/Spinner/Spinner';
const AppRoutes = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  setTimeout(() => {
    setShowSpinner(false);
  }, 2000)
  return (
    <Router>
      {showSpinner && <Spinner />}
      <div className={showSpinner ? "container--app-noshow" : "container--app-show"}>
        <Header />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/search/:searchProducts" component={Search} /> 
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/payment/success/:token" component={PaymentSuccess}/>
            <Route exact path="/payment/failure/:token" component={PaymentFailure}/>
            <Route exact path="/product/:name" component={Product} />
            <Route exact path="/category/:category" component={Categories} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/forget-password" component={ForgetPassword} />
            <Route exact path="/newuser/:token" component={NewUser} />
            <Route exact path="/backoffice/product" component={AddProductBackoffice} />
            <Route exact path="/backoffice/admin" component={AdministradorBack} />
            <Route exact path="/backoffice/moderator" component={ModeratorBack} />
            <Route exact path="/backoffice/:name_id_product" component={EditProduct} />
            <Route path='*' component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRoutes

