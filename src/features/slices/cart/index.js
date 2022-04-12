import { createSlice } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("cart-products") ? localStorage.getItem("cart-products") : [];

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            console.log("AGREGARIA PRODUCTO")
            // if (initialState.length === 0) {
            //     initialState.push(action.payload);
            //     let stringifyInitialState = JSON.stringify(initialState);
            //     initialState = JSON.stringify(stringifyInitialState);
            // } else {
            //     let parseInitialState = JSON.parse(initialState);
            //     initialState = JSON.parse(parseInitialState);
            //     let productInCart = initialState.find(data => data.id === action.payload.id);
            //     initialState.push(action.payload);
            //     let stringifyInitialState = JSON.stringify(initialState);
            //     initialState = JSON.stringify(stringifyInitialState);
            // }
            // localStorage.setItem("cart-products", initialState);
            let parseInitialState = JSON.parse(initialState);
            initialState = JSON.parse(parseInitialState);
            let findItem = initialState.find(data => data.id === action.payload.id);
            console.log(findItem)
            let answer;
            // findItem ? 
            answer = {
                ...initialState,
                
            } 
            console.log(answer)
            // if (findItem.length !== 0) {
            //     initialState = {
            //         ...
            //     }
            // }
            return state = [...initialState];
        },
        deleteProduct: (state, action) => {
            if (initialState.length !== 0) {
                let parseInitialState = JSON.parse(initialState);
                initialState = JSON.parse(parseInitialState);
                // let filterInitialState = initialState.filter(data => parseInt(data.id) !== parseInt(action.payload));
                const index = initialState.findIndex((item) => item.id === action.payload);
                let filterInitialState = [...initialState];
                filterInitialState.splice(index, 1);
                let stringifyInitialState = JSON.stringify(filterInitialState);
                initialState = JSON.stringify(stringifyInitialState);
            }
            localStorage.setItem("cart-products", initialState);
            return state = [...initialState];
        }
    }
})

export const {addProduct, deleteProduct} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;