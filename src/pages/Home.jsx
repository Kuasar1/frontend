import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import Login from "./Login";

const Home = () => {
	return localStorage.getItem("user") ? (
		<div>
			<Announcement />
			<Navbar />
			<Slider />
			<Products />
			<Categories />
			<NewsLetter />
			<Footer />
		</div>
	) : (
		<Login />
	);
};

export default Home;
