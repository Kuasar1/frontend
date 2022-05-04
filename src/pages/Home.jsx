import React from "react";
import Announcement from "../components/Announcement";
import Suggestions from "../components/Suggestions";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
	return localStorage.getItem("user") != null ? (
		<div>
			<Announcement />
			<Navbar />
			<Slider />
			<Suggestions />
			<Products />
			<NewsLetter />
			<Footer />
		</div>
	) : (
		<div>
			<Announcement />
			<Navbar />
			<Slider />
			<Products />
			<NewsLetter />
			<Footer />
		</div>
	);
};

export default Home;
