import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import StarRating from "../components/StarRating";

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImageContainer = styled.div`
	flex: 1;
`;

const Image = styled.img`
	width: 100%;
	height: 90vh;
	object-fit: cover;
	${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 200;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
`;

const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`;

const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	margin: 0px 5px;
	cursor: pointer;
`;

const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
	cursor: pointer;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 1000;
`;

const StarContainer = styled.div`
	input[type="radio"] {
		display: none;
	}
	display: flex;
	align-items: center;
	font-weight: 100;
	margin: 30px 0px;
	cursor: pointer;
	transition: color 200ms;
`;

const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 2px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`;

const Button = styled.button`
	padding: 15px;
	border-radius: 10px;
	font-weight: 500;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;

	&:hover {
		background-color: #e9f5f5;
	}
`;

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/" + id);
				setProduct(res.data);
			} catch (err) {}
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		if (type === "decrease") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		if (
			localStorage.getItem("user") != undefined ||
			localStorage.getItem("user") != null
		) {
			dispatch(addProduct({ ...product, quantity, color, size }));
		} else {
			history.push("/login");
		}
	};

	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<ImageContainer>
					<Image src={product.image} />
				</ImageContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Desc>{product.description}</Desc>
					<Price>$ {product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color</FilterTitle>
							{product.color?.map((c) => (
								<FilterColor color={c} key={c} onClick={() => setColor(c)} />
							))}
						</Filter>
						<Filter>
							<FilterTitle>Size</FilterTitle>
							<FilterSize onChange={(e) => setSize(e.target.value)}>
								{product.size?.map((s) => (
									<FilterSizeOption key={s}>{s}</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={() => handleQuantity("decrease")} />
							<Amount>{quantity}</Amount>
							<Add onClick={() => handleQuantity("increase")} />
						</AmountContainer>
						<Button onClick={handleClick}>Add to cart</Button>
					</AddContainer>
					<StarContainer>
						<StarRating />
					</StarContainer>
				</InfoContainer>
			</Wrapper>
			<NewsLetter />
			<Footer />
		</Container>
	);
};

export default Product;
