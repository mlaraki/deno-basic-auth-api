import { User } from "../types/interfaces.ts";
import client from "../db/client.ts";
import * as yup from "https://cdn.pika.dev/yup@^0.28.5";

let userRegisterSchema = yup.object().shape({
	username: yup.string().min(3).max(30).required().matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/),
	firstname: yup.string().min(3).max(30).required().matches(/^[a-z ,.'-]+$/i),
	lastname: yup.string().min(3).max(30).required().matches(/^[a-z ,.'-]+$/i),
	email: yup.string().email().max(50).required(),
	password: yup.string().min(6).max(100).required(),
});

const formatBody = (body: User) => {
	for (const property in body) {
		if (property != "password") body[property] = body[property].toLowerCase();
	}
	return body;
};

const validateSchema = async (infos: User): Promise<boolean> => {
	let isValid = await userRegisterSchema.isValid(infos);
	return isValid;
};

const validateInputs = async ({ username, email }: { username: string; email: string }, ctx: any, ): Promise<boolean> => {
	try {
		let res = await client.query("SELECT * FROM users WHERE username = $1 OR email = $2;",
			username,
			email,
		);
		return !res.rows[0] || false;
	} catch (error) {
		return ctx.throw(500, `💩 ${error.message} 💩`);
	}
};

const registerValidation = async (infos: User, ctx: any) => {
	let isValid = await validateSchema(infos);
	let areUnique = await validateInputs(infos, ctx);

	if (!isValid) ctx.throw(404, "Invalid inputs");
	if (!areUnique) ctx.throw(404, "Username or Email is already taken");
};

export { formatBody, registerValidation }