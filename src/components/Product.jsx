import { Link } from "react-router-dom";
import {
	Favorite,
	FavoriteBorderOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
	ThumbDown,
	ThumbDownOutlined,
	ThumbUp,
	ThumbUpOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearProducts } from "../redux/cartRedux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Info = styled.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`;

const Container = styled.div`
	flex: 1;
	margin: 5px;
	min-width: 280px;
	height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;

	&:hover ${Info} {
		opacity: 1;
	}
`;

const Circle = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`;

const Image = styled.img`
	height: 75%;
	z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display; flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const DislikeIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display; flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({ item }) => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({});
	const quantity = 1;
	const color = item.color;
	const size = item.size[1];
	const history = useHistory();
	const [like, setLike] = useState(false);
	const [dislike, setDisLike] = useState(false);

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/" + item.id);
				setProduct(res.data);
			} catch (err) {}
		};
		getProduct();
	}, [item.id]);

	const handleClick = () => {
		if (
			localStorage.getItem("user") != undefined ||
			localStorage.getItem("user") != null
		) {
			dispatch(addProduct({ ...product, quantity, color, size }));
		} else {
			history.push("/login");
			history.go(0);
		}
	};

	const handleLike = async () => {
		if (
			localStorage.getItem("user") != undefined ||
			localStorage.getItem("user") != null
		) {
			if (like) {
				setLike(false);
				setDisLike(false);
			} else {
				setDisLike(false);
				setLike(true);
			}
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("ACCESS_TOKEN"),
				},
			};
			try {
				const user = JSON.parse(localStorage.getItem("user"));
				const res = await userRequest.post(
					"/products/like",
					{ userId: user.id, productId: product.id, like: -1 },
					config
				);
				console.log(res);
			} catch (err) {}
		} else {
			history.push("/login");
			history.go(0);
		}
	};

	const handleDislike = async () => {
		if (
			localStorage.getItem("user") != undefined ||
			localStorage.getItem("user") != null
		) {
			if (dislike) {
				setDisLike(false);
				setLike(false);
			} else {
				setLike(false);
				setDisLike(true);
			}
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("ACCESS_TOKEN"),
				},
			};
			try {
				const user = JSON.parse(localStorage.getItem("user"));
				const res = await userRequest.post(
					"/products/like",
					{ userId: user.id, productId: product.id, like: -1 },
					config
				);
				console.log(res);
			} catch (err) {}
		} else {
			history.push("/login");
			history.go(0);
		}
	};

	return (
		<Container>
			<Circle />
			<Image src={item.image} />
			<Info>
				{/* <DislikeIcon onClick={like ? handleDislike : handleDislike}>
					{dislike ? (
						<ThumbDown style={{ color: "teal", padding: "8px" }} />
					) : (
						<ThumbDownOutlined style={{ color: "teal", padding: "8px" }} />
					)}
				</DislikeIcon> */}
				<Icon onClick={handleClick}>
					<ShoppingCartOutlined style={{ color: "teal", padding: "8px" }} />
				</Icon>
				<Icon>
					<Link to={`/product/${item.id}`}>
						<SearchOutlined style={{ color: "teal", padding: "8px" }} />
					</Link>
				</Icon>
				<Icon onClick={like ? handleLike : handleLike}>
					{like ? (
						<ThumbUp style={{ color: "teal", padding: "8px" }} />
					) : (
						<ThumbUpOutlined style={{ color: "teal", padding: "8px" }} />
					)}
				</Icon>
			</Info>
		</Container>
	);
};

export default Product;
