import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

export const filterProducts = createSlice({
    name:"filterProduct",
    initialState,
    reducers: {
        setData: (state, action) => {
            initialState = action.payload;
            return state = action.payload;
        },
        filterByOrder: (state, action) => {
            let valueSelect = action.payload.valueSelect;
            let arrayForSort = [...initialState];
            if (valueSelect === 1) return state = [...arrayForSort.sort(((prev, current) => prev.price > current.price ? 1 : -1))];
            if (valueSelect === 2) return state = [...arrayForSort.sort((prev, current) => prev.price > current.price ? -1 : 1)];
            if (valueSelect === 3) return state = [...arrayForSort.sort((prev, current) => prev.name > current.name ? 1 : -1)];
            if (valueSelect === 4) return state = [...arrayForSort.sort((prev, current) => prev.name > current.name ? -1 : 1)]; 
        },
        filterByPrice: (state, action) => {
            let priceMin = action.payload.priceMin;
            let priceMax = action.payload.priceMax;
            if (priceMax !== null) return state = initialState.filter(data => data.price > priceMin && data.price < priceMax)
            if (priceMin === 1000) return state = initialState.filter(data => data.price < priceMin)
            if (priceMin === 4500) return state = initialState.filter(data => data.price > priceMin)
        }
    }
})

export const { filterByOrder, filterByPrice, setData } = filterProducts.actions;

export default filterProducts.reducer;