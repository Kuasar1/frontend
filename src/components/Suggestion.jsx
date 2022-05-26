import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
	flex: 1;
	margin: 3px;
	height: 50vh;
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	${mobile({ height: "20vh" })}
`;

const Info = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 160%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	color: black;
	font-size: 40px;
	margin-bottom: 20px;
`;

const Button = styled.button`
	padding: 10px;
	border: none;
	margin-bottom: 200px;
	background-color: white;
	font-size: 24px;
	color: black;
	cursor: pointer;
	opacity: 70%;
	font-weight: 150;
	transition: all 0.5s ease;
	&:hover {
		background-color: #e9f5f5;
		transform: scale(1.1);
	}
`;

const Suggestion = ({ item }) => {
	return (
		<Container>
			<Link to={`/products/${item.key}`}>
				<Image src={item.img} />
				<Info>
					<Title>{item.title}</Title>
					<Button>SHOP NOW</Button>
				</Info>
			</Link>
		</Container>
	);
};

export default Suggestion;
