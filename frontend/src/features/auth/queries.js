import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../users";
import { getNewTokens, getProfile, login, register, updateProfile } from "./api";
import { REFRESH_TOKEN_KEY, TOKENS_INITIAL_VALUES } from "./constants";

export const authKeys = {
	key: () => ["auth"],
	tokens: () => [...authKeys.key(), "tokens"],
	profile: () => [...authKeys.key(), "profile"],
};

export const useAuth = () => {
	const queryClient = useQueryClient();

	const { data, isPending, isError } = useQuery({
		queryKey: authKeys.tokens(),
		queryFn: () => {
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
			return refreshToken ? getNewTokens(refreshToken) : TOKENS_INITIAL_VALUES;
		},

		refetchInterval: 1000 * 60 * 30, // 30 minutes
	});
	const { refresh, access } = data ?? TOKENS_INITIAL_VALUES;

	const onSignin = ({ refresh, access }) => {
		localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
		queryClient.setQueryData(authKeys.tokens(), { refresh, access });
	};

	const onSignout = () => {
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		queryClient.setQueryData(authKeys.tokens(), TOKENS_INITIAL_VALUES);
	};

	const isAuthenticated = Boolean(access);

	useEffect(() => {
		if (isError) {
			onSignout();
		}
		if (refresh) {
			localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, refresh]);

	return {
		refreshToken: refresh,
		accessToken: access,
		isAuthenticated,
		onSignin,
		onSignout,
		isPending,
		isError,
	};
};

export const useGetProfile = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: () => getProfile(accessToken),
		enabled: !!accessToken,
	});
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,
		onSuccess({ refresh, access }) {
			localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
			queryClient.setQueryData(authKeys.tokens(), { refresh, access });
		},
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: register,
	});
};

export const useSignout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => Promise.resolve(),
		onSuccess() {
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			queryClient.setQueryData(authKeys.tokens(), TOKENS_INITIAL_VALUES);
			queryClient.setQueryData(authKeys.profile(), null);
		},
	});
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values) => updateProfile(accessToken, values),
		onSuccess(response) {
			queryClient.setQueryData(authKeys.profile(), response);
			queryClient.setQueryData(userKeys.getByUsername(response.username), response);
			queryClient.setQueryData(userKeys.getById(response.id), response)
		},
	});
};
