import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import React from "react";
import { mobile } from "../responsive";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { clearProducts } from "../redux/cartRedux";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopText = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 20px;
	font-weight: 1000;
	text-align: center;
	font-size: 30px;
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;

const Image = styled.img`
	width: 200px;
`;

const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;

const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemValue = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	margin: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
	cursor: pointer;
`;

const Order = () => {
	const location = useLocation();
	const data = location.state.stripeData;
	const cart = location.state.products;
	const user = useSelector((state) => state.user.currentUser);
	const history = useHistory();
	const [orderId, setOrderId] = useState(null);
	const dispatch = useDispatch();
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

		const createOrder = async () => {
			try {
				const res = await userRequest.post(
					"/order/add",
					{
						userId: user.id,
						products: cart.products,
						amount: cart.total,
						address: data.billing_details.address,
					},
					config
				);
				console.log(res);
				setOrderId(res.data.id);
				dispatch(clearProducts());
			} catch {}
		};
		data && createOrder();
	}, [cart, data, user]);

	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<Title>Order</Title>
				<Top>
					<TopText>Your order has been placed successfully!</TopText>
				</Top>
				<Bottom>
					<Info>
						{cart.products.map((product) => (
							<Product key={product.id}>
								<ProductDetail>
									<Image src={product.image} />
									<Details>
										<ProductName>
											<b>Product:</b> {product.title}
										</ProductName>
										<ProductId>
											<b>ID:</b> {product.id}
										</ProductId>
										<ProductColor color={product.color}></ProductColor>
										<ProductSize>
											<b>Size:</b> {product.size}
										</ProductSize>
									</Details>
								</ProductDetail>
							</Product>
						))}
						<Hr />
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Shipping:</SummaryItemText>
							<SummaryItemValue>FREE</SummaryItemValue>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Order status:</SummaryItemText>
							<SummaryItemValue>PAID</SummaryItemValue>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Arrival:</SummaryItemText>
							<SummaryItemValue>5 working days</SummaryItemValue>
						</SummaryItem>
						<SummaryItem type="total">
							<SummaryItemText>Order total</SummaryItemText>
							<SummaryItemValue>$ {cart.total}</SummaryItemValue>
						</SummaryItem>
						<Button onClick={handleClick}>Go to Homepage</Button>
					</Summary>
				</Bottom>
			</Wrapper>
			<Footer />
		</Container>
	);
};

export default Order;
