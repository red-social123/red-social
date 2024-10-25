import { mixed, object, ref, string } from "yup";

const username = string().label("Username").required().default("");
const first_name = string().label("First Name").required().default("");
const last_name = string().label("Last Name").required().default("");
const email = string().label("Email").email().required().default("");
const password = string().label("Password").min(8).required().default("");
const images = mixed()
	.label("Profile")
	.test("is-valid-type", "Invalid profile picture", (file) => {
		if (!file) return true;
		const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

		return SUPPORTED_FORMATS.includes(file.type);
	})
	.test("is-valid-size", "File too large", (file) => {
		if (!file) return true;
		const MAX_SIZE = 1024 * 1024 * 2; // 2MB

		return file.size <= MAX_SIZE;
	})
	.nullable()
	.default(null);

export const signinSchema = object({
	email,
	password,
});

export const signinInitialValues = signinSchema.getDefault();

export const signupSchema = object({
	first_name,
	last_name,
	email,
	password,
	password2: string()
		.label("Confirm Password")
		.oneOf([ref("password")], "Passwords must match.")
		.required()
		.default(""),
});

export const signupInitialValues = signupSchema.getDefault();

export const editProfileSchema = object({
	username,
	first_name,
	last_name,
	email,
	images,
});
