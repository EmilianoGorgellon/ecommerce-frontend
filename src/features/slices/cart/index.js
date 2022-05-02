import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            const find_product = initialState.findIndex(data => data.name === action.payload.name);
            // Si no existe el producto devuelve -1, si existe devuelve su index en el array
            if (find_product !== -1) {
                const quantity = initialState[find_product].quantity;
                initialState.splice(find_product, 1, {...initialState[find_product], quantity: quantity + 1})
            } else {
                initialState.push({...action.payload, quantity: 1});
            }
            return [...initialState];
        },
        deleteProduct: (state, action) => {
            const find_product = initialState.findIndex(data => data.id === action.payload)
            const quantity_product = initialState[find_product].quantity;
            if (quantity_product > 1) {
                initialState.splice(find_product, 1, {...initialState[find_product], quantity: quantity_product - 1});
            } else {
                initialState.splice(find_product, 1)
            }
            return [...initialState];
        }
    }
})

export const {addProduct, deleteProduct} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;