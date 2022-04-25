import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { userRequest } from "../requestMethods";

const StarRating = () => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);

	const handleChange = (e) => {
		console.log("handlechange:" + e);
	};

	const handle = (e) => {
		console.log("handle" + e);
		//const res = await userRequest.post("/products/addRating", e);
	};

	const handleSubmit = (e) => {
		console.log("handlesubmit: " + e);
	};

	return (
		<div>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;
				return (
					<label key={i}>
						<input
							type="radio"
							name="rating"
							value={ratingValue}
							onChange={handleChange(ratingValue)}
							onSubmit={handleSubmit(ratingValue)}
							//onClick={this.props.onClick ? handle(ratingValue) : handle(e)}
						/>
						<FaStar
							color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
							size={25}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
							onMouseClick={handle(ratingValue)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;
