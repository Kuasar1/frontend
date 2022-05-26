import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { userRequest } from "../requestMethods";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ suggestion, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const user = localStorage.getItem("user");
				let res;
				if (
					user != null &&
					(suggestion == "JustForYou" ||
						suggestion == "MostPopular" ||
						suggestion == "YouMayLike")
				) {
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("ACCESS_TOKEN"),
						},
						params: { userId: JSON.parse(user).id },
					};
					res = await userRequest.get(
						suggestion ? `/recommendations/${suggestion}` : "/products/",
						config
					);
				} else {
					res = await userRequest.get(
						suggestion ? `/products?category=${suggestion}` : "/products/"
					);
				}

				setProducts(res.data);
			} catch (err) {}
		};
		getProducts();
	}, [suggestion]);

	useEffect(() => {
		suggestion &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([suggestion, value]) =>
						item[suggestion].includes(value)
					)
				)
			);
	}, [products, suggestion, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	}, [sort]);

	return (
		<Container>
			{suggestion
				? filteredProducts.map((item) => <Product item={item} key={item.id} />)
				: products
						.slice(0, 30)
						.map((item) => <Product item={item} key={item.id} />)}
		</Container>
	);
};

export default Products;
