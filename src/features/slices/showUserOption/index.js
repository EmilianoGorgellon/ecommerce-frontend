import { createSlice } from "@reduxjs/toolkit";

let initialState = false;

export const showUserOption = createSlice({
    name: "show_user_option",
    initialState,
    reducers: {
        showMenu: (state, action) => {
            return action.payload;
        }
    }
});

export const {showMenu} = showUserOption.actions;
export default showUserOption.reducer;
