import React from "react";
import { suggestions } from "../data";
import styled from "styled-components";
import Suggestion from "./Suggestion";
import { mobile } from "../responsive";

const Container = styled.div`
	display: flex;
	padding: 20px;
	justify-content: space-between;
	${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Suggestions = () => {
	return (
		<Container>
			{suggestions.map((item) => (
				<Suggestion item={item} key={item.id} />
			))}
		</Container>
	);
};

export default Suggestions;
