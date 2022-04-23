import { Link } from "react-router-dom";
import {
	FavoriteBorderOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct, clearProducts } from "../redux/cartRedux";
import { useHistory } from "react-router-dom";

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

const Product = ({ item }) => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({});
	const quantity = 1;
	const color = item.color;
	const size = item.size[1];
	const history = useHistory();

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
		}
	};

	return (
		<Container>
			<Circle />
			<Image src={item.image} />
			<Info>
				<Icon onClick={handleClick}>
					<ShoppingCartOutlined style={{ padding: "8px" }} />
				</Icon>
				<Icon>
					<Link to={`/product/${item.id}`}>
						<SearchOutlined style={{ padding: "8px" }} />
					</Link>
				</Icon>
			</Info>
		</Container>
	);
};

export default Product;
