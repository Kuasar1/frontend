import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearProducts } from "../redux/cartRedux";
import Login from "./Login";

const KEY = process.env.REACT_APP_STRIPE;

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

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "teal" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;

const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
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

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

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

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: teal;
	color: white;
	font-weight: 600;
	cursor: pointer;
`;

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const [stripeToken, setStripeToken] = useState(null);
	const history = useHistory();
	const dispatch = useDispatch();

	const onToken = (token) => {
		setStripeToken(token);
	};

	const handleDelete = () => {
		dispatch(clearProducts());
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const makeRequest = async () => {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("ACCESS_TOKEN"),
				},
			};

			try {
				const res = await userRequest.post(
					"/payment/charge",
					{
						source: stripeToken.id,
						amount: cart.total * 100,
						currency: "usd",
					},
					config
				);
				dispatch(clearProducts());
				history.push("/order", {
					stripeData: res.data,
					products: cart,
				});
				history.go(0);
			} catch (err) {}
		};
		stripeToken && cart.total >= 1 && makeRequest();
	}, [stripeToken, cart.total, history]);

	return localStorage.getItem("user") ? (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<Title>Your cart</Title>
				<Top>
					<Link to="/">
						<TopButton>CONTINUE SHOPPING</TopButton>
					</Link>
					<TopTexts>
						<TopText>Shopping bag({cart.quantity})</TopText>
						<TopText>Your wishlist(0)</TopText>
					</TopTexts>
					<TopButton onClick={handleDelete} type="filled">
						CLEAR CART
					</TopButton>
				</Top>
				<Bottom>
					<Info>
						{cart.products?.map((product) => (
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
								<PriceDetail>
									<ProductAmountContainer>
										<Add />
										<ProductAmount>{product.quantity}</ProductAmount>
										<Remove />
									</ProductAmountContainer>
									<ProductPrice>
										$ {product.price * product.quantity}
									</ProductPrice>
								</PriceDetail>
							</Product>
						))}
						<Hr />
					</Info>
					<Summary>
						<SummaryTitle>CART SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Subtotal</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Estimated shipping</SummaryItemText>
							<SummaryItemPrice>$ 5.99</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Shipping discount</SummaryItemText>
							<SummaryItemPrice>$ -5.99</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem type="total">
							<SummaryItemText>Total</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<StripeCheckout
							name="AmarBuy"
							image="https://icon-library.com/images/money-icon-png/money-icon-png-2.jpg"
							billingAddress
							shippingAddress
							description={`Your total is $${cart.total}`}
							amount={cart.total * 100}
							token={onToken}
							stripeKey={KEY}
						>
							<Button disabled={cart.total == 0} onClick={() => {}}>
								CHECKOUT NOW
							</Button>
						</StripeCheckout>
					</Summary>
				</Bottom>
			</Wrapper>
			<Footer />
		</Container>
	) : (
		<Login />
	);
};

export default Cart;
