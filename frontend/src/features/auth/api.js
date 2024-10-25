import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

export const login = (values) => {
	return fetcher(`${BASE_API_URL}/api/auth/login/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

export const register = (values) => {
	return fetcher(`${BASE_API_URL}/api/auth/register/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
};

export const signout = () => {
	return fetcher(`${BASE_API_URL}/api/auth/signout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getProfile = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/auth/profile/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getNewTokens = (refreshToken) => {
	return fetcher(`${BASE_API_URL}/api/auth/refresh-token/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refresh: refreshToken }),
	});
};

export const updateProfile = (accessToken, values) => {
	return fetcher(`${BASE_API_URL}/api/auth/profile/`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: values,
	});
};
