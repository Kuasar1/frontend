import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
			localStorage.setItem("ACCESS_TOKEN", state.currentUser.accessToken);
		},
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		registerStart: (state) => {
			state.isFetching = true;
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
			localStorage.setItem("ACCESS_TOKEN", state.currentUser.accessToken);
		},
		registerFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	registerStart,
	registerSuccess,
	registerFailure,
} = userSlice.actions;
export default userSlice.reducer;
