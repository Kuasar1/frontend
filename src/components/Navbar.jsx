import { Badge } from "@material-ui/core";
import {
	ExitToApp,
	HomeOutlined,
	Search,
	ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { getProduct } from "../redux/apiCalls";

const Container = styled.div`
	height: 60px;
	${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

const HomeButton = styled.span`
	font-size: 14px;
	cursor: pointer;
	color: teal;
	${mobile({ display: "none" })}
`;

const CartIcon = styled.span`
	font-size: 14px;
	cursor: pointer;
	color: teal;
`;

const LogoutIcon = styled.span`
	font-size: 14px;
	cursor: pointer;
	color: teal;
`;

const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`;

const Input = styled.input`
	border: none;
	${mobile({ width: "50px" })}
`;

const Center = styled.div`
	flex: 1;
	text-align: center;
`;

const Logo = styled.h1`
	font-weight: bold;
	${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 15px;
	${mobile({ flex: 2, justifyContent: "center" })}
`;

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const history = useHistory();
	const [name, setName] = useState("");

	const handleLogout = () => {
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("user");
		history.push("/login");
	};

	const handleSearch = () => {
		console.log("clicked");
		if (name.trim().length === 0) {
			return alert("String is empty");
		} else {
			getProduct(name);
			//TODO
		}
	};

	return (
		<Container>
			<Wrapper>
				<Left>
					<Link to="/">
						<HomeButton>
							<HomeOutlined />
						</HomeButton>
					</Link>
					<SearchContainer>
						<Input
							placeholder="Search"
							onChange={(e) => setName(e.target.value)}
						/>
						<Search
							onClick={handleSearch}
							style={{ color: "gray", fontSize: 16 }}
						/>
					</SearchContainer>
				</Left>
				<Center>
					<Logo>EZbuy</Logo>
				</Center>
				<Right>
					<Link to="/cart">
						<CartIcon>
							<Badge
								badgeContent={quantity}
								color="primary"
								overlap="rectangular"
							>
								<ShoppingCartOutlined />
							</Badge>
						</CartIcon>
					</Link>
					<LogoutIcon>
						<Badge onClick={handleLogout} color="primary" overlap="rectangular">
							<ExitToApp />
						</Badge>
					</LogoutIcon>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
