import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

let initialState = "";
const cookie = new Cookies();
export const getTokenSlice = createSlice({
    name: "getToken",
    initialState,
    reducers: {
        getTokenFromCookie: (state, action) => {
            const token = cookie.get("token");
            if (token === undefined) return state = "";
            return state = token;
        },
        deleteTokenFromCookie: (state, action) => {
            cookie.remove("token");
            return state = "";
        }
    }
});

export const { getTokenFromCookie, deleteTokenFromCookie } = getTokenSlice.actions;

export default getTokenSlice.reducer;