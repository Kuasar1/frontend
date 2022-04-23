import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			let incomingId = action.payload.id;
			const exist = state.products.find((e) => e.id === incomingId);
			if (exist) {
				state.products = state.products.map((e) =>
					e.id === incomingId ? { ...exist, quantity: exist.quantity + 1 } : e
				);
			} else {
				state.products.push(action.payload);
			}
			state.quantity += 1;
			state.total += action.payload.price * action.payload.quantity;
		},
		clearProducts: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0.0;
		},
	},
});

export const { addProduct } = cartSlice.actions;
export const { clearProducts } = cartSlice.actions;
export default cartSlice.reducer;
