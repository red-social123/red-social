import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RedirectAuthenticated } from "./shared/components";
import * as Home from "./routes";
import * as Login from "./routes/auth/login";
import * as Register from "./routes/auth/register";
import * as Profile from "./routes/[username]";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home.Layout />,
		children: [
			{
				index: true,
				element: <Home.Page />,
			},
			{
				path: ":username",
				element: <Profile.Page />,
			},
		],
	},
	{
		path: "/auth/login",
		element: (
			<RedirectAuthenticated>
				<Login.Page />
			</RedirectAuthenticated>
		),
	},
	{
		path: "/auth/register",
		element: (
			<RedirectAuthenticated>
				<Register.Page />
			</RedirectAuthenticated>
		),
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
