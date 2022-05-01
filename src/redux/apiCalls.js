import { publicRequest } from "../requestMethods";
import {
	loginFailure,
	loginStart,
	loginSuccess,
	registerFailure,
	registerStart,
	registerSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await publicRequest.post("/customers/login", user, config);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const register = async (dispatch, user) => {
	dispatch(registerStart());
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await publicRequest.post("/customers/register", user, config);
		dispatch(registerSuccess(res.data));
	} catch (err) {
		dispatch(registerFailure());
	}
};

export const getProduct = async (productName) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await publicRequest.get(
			"/products/getByName/" + productName,
			config
		);
	} catch (err) {}
};
