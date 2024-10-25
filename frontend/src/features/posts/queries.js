import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { authKeys, useAuth } from "../auth";
import { create, getFeed, getPosts, getOneUser, remove } from "./api";

export const postKeys = {
	key: () => ["posts"],
	feed: () => [...postKeys.key(), "feed"],
	byUsername: (username) => [...postKeys.key(), "by-username", username],
	getOne: (id) => [...postKeys.key(), "get-one", id],
};

export const useGetFeed = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.feed(),
		queryFn: () => getFeed(accessToken),
		select: (data) => {
			data.results.sort((a, b) => b.id - a.id);
			return data;
		},
		enabled: !!accessToken,
	});
};

export const useGetPosts = (username) => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.byUsername(username),
		queryFn: () => getPosts(accessToken, username),
		enabled: !!accessToken,
	});
};

export const useGetPost = () => {
	const { id } = useParams();

	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getOne(id),
		queryFn: () => getOneUser(id),
		enabled: accessToken && id,
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values) => create(accessToken, values),
		onSuccess: (post) => {
			const profile = queryClient.getQueryData(authKeys.profile());

			queryClient.setQueryData(postKeys.byUsername(profile.username), (old) => {
				if (!old) {
					return [post];
				}
				return [post, ...old];
			});
			queryClient.setQueryData(postKeys.feed(), (old) => {
				if (!old)
					return {
						count: 1,
						next: null,
						previous: null,
						results: [post],
					};
				return {
					...old,
					results: [post, ...old.results],
				};
			});
		},
	});
};

export const useRemovePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => remove(accessToken, id),
		onSuccess: (_, id) => {
			const profile = queryClient.getQueryData(authKeys.profile());

			queryClient.setQueryData(postKeys.byUsername(profile.username), (old) => {
				if (!old) return [];
				return old.filter((p) => p.id !== id);
			});
			queryClient.setQueryData(postKeys.feed(), (old) => {
				if (!old)
					return {
						count: 0,
						next: null,
						previous: null,
						results: [],
					};
				return {
					...old,
					results: old.results.filter((post) => post.id !== id),
				};
			});
		},
	});
};
