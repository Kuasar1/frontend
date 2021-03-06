import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";

const Container = styled.div``;

const Title = styled.h1`
	margin: 20px;
`;

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
	${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
	padding: 5px;
	margin-right: 20px;
	${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
	window.scrollTo(0, 0);
	const location = useLocation();
	const suggestion = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilters = (e) => {
		const value = e.target.value;
		if (value !== "") {
			setFilters({
				...filters,
				[e.target.name]: value,
			});
		} else {
			setFilters({});
		}
	};

	return (
		<Container>
			<Navbar />
			<Announcement />
			<Title>{suggestion}</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option value="">Color</Option>
						<Option>white</Option>
						<Option>black</Option>
						<Option>red</Option>
						<Option>blue</Option>
						<Option>yellow</Option>
						<Option>green</Option>
						<Option>brown</Option>
						<Option>gray</Option>
					</Select>
					<Select name="size" onChange={handleFilters}>
						<Option value="">Shoe size</Option>
						<Option>5</Option>
						<Option>6</Option>
						<Option>7</Option>
						<Option>8</Option>
						<Option>9</Option>
						<Option>10</Option>
					</Select>
					<Select name="size" onChange={handleFilters}>
						<Option value="">Clothing Size</Option>
						<Option>XXS</Option>
						<Option>XS</Option>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
						<Option>XXL</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select onChange={(e) => setSort(e.target.value)}>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price (asc)</Option>
						<Option value="desc">Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products suggestion={suggestion} filters={filters} sort={sort} />
			<NewsLetter />
			<Footer />
		</Container>
	);
};

export default ProductList;
