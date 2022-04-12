import {configureStore} from "@reduxjs/toolkit";
import shoppingCartReducer from "../features/slices/cart";
import filterProducts from "../features/slices/filterProducts";
import getTokenSlice from "../features/slices/token";
import showUserOption from "../features/slices/showUserOption";
export default configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
        filterProducts: filterProducts,
        getToken: getTokenSlice,
        show_user_option: showUserOption
    }
})