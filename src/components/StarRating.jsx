import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const StarRating = (props) => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	const [isDisable, setIsDisable] = useState(props.rated ? true : false);
	const history = useHistory();

	const handleClick = async (e) => {
		if (
			localStorage.getItem("user") != undefined ||
			localStorage.getItem("user") != null
		) {
			if (props.rated) {
				setRating(props.productRating);
				setIsDisable(true);
			} else {
				setRating(e);
				setIsDisable(true);
			}
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("ACCESS_TOKEN"),
				},
			};

			try {
				const user = localStorage.getItem("user");
				const res = await userRequest.post(
					"/products/rating",
					{
						userId: JSON.parse(user).id,
						productId: props.productId,
						rating: e,
					},
					config
				);
			} catch {}
		} else {
			history.push("/login");
			history.go(0);
		}
	};

	return props.rated ? (
		<div>
			{[...Array(5)].map((star, i) => {
				return (
					<label key={i}>
						<input
							type="radio"
							name="rating"
							value={props.productRating}
							disabled={true}
						/>
						<FaStar
							color={i < props.productRating ? "#ffc107" : "#e4e5e9"}
							size={25}
						/>
					</label>
				);
			})}
		</div>
	) : (
		<div>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;
				return (
					<label key={i}>
						<input
							type="radio"
							name="rating"
							value={ratingValue}
							defaultChecked
							onClick={() => handleClick(ratingValue)}
							disabled={isDisable}
						/>
						<FaStar
							color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
							size={25}
							onMouseEnter={() => (isDisable ? null : setHover(ratingValue))}
							onMouseLeave={() => (isDisable ? null : setHover(null))}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;
