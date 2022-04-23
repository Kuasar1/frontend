import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const TOKEN = localStorage.getItem("ACCESS_TOKEN");
export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: { token: `Authorization ${TOKEN}` },
});
