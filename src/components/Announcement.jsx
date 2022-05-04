import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	height: 30px;
	background-color: teal;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: 500px;
`;

const Announcement = () => {
	return (
		<Container>
			<Link to="/register">Join us to get product recommendations today!</Link>
		</Container>
	);
};

export default Announcement;
