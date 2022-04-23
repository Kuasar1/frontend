import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import React from "react";
import { stripeData } from "../data";
import { clearProducts } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Success = () => {
	const location = useLocation();
	//in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
	const data = location.state.stripeData;
	const cart = location.state.products;
	const user = useSelector((state) => state.user.currentUser);
	const history = useHistory();
	const [orderId, setOrderId] = useState(null);

	const handleClick = () => {
		history.push("/");
	};

	useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("ACCESS_TOKEN"),
			},
		};
		console.log(cart.products);
		const createOrder = async () => {
			try {
				const res = await userRequest.post(
					"/order/add",
					{
						userId: user._id,
						// products: cart.products,
						products: cart.products.map((item) => ({
							productId: item._id,
							quantity: item._quantity,
						})),
						amount: cart.total,
						address: data.billing_details.address,
					},
					config
				);
				console.log(res);
				setOrderId(res.data._id);
			} catch {}
		};
		data && createOrder();
	}, [cart, data, user]);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{orderId
				? `Order has been created successfully. Your order number is ${orderId}`
				: `Successfull. Your order is being prepared...`}
			<button onClick={handleClick} style={{ padding: 10, marginTop: 20 }}>
				Go to Homepage
			</button>
		</div>
	);
};

export default Success;
