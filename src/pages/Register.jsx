import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	padding: 20px;
	width: 40%;
	background-color: white;
	${mobile({ width: "75%" })}
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const LoginLink = styled.a`
	padding: 20px 20px;
`;

const Error = styled.span`
	color: red;
`;

const Register = () => {
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

	const handleClick = (e) => {
		e.preventDefault();
		register(dispatch, {
			username,
			firstname,
			lastname,
			email,
			password,
		});
	};

	return (
		<Container>
			<Wrapper>
				<Title>Create an account</Title>
				<Form>
					<Input
						placeholder="First name"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<Input
						placeholder="Last name"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<Input
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder="Password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						placeholder="Confirm password"
						type="password"
						onChange={(e) => setConfirm(e.target.value)}
					/>
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <u>PRIVACY POLICY</u>
					</Agreement>
					<Button onClick={handleClick} disabled={isFetching}>
						Create
					</Button>
					<LoginLink>
						<Link to="/login">ALREADY HAVE ACCOUNT? SIGN IN</Link>
					</LoginLink>
					{error && <Error>Something went wrong...</Error>}
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
