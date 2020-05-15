import { UserLogin } from "../types/interfaces.ts";
import * as yup from "https://cdn.pika.dev/yup@^0.28.5";

let userLoginSchema = yup.object().shape({
	username: yup.string().min(3).max(30).required().matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/),
	password: yup.string().min(6).max(100).required(),
});

export const loginValidation = async (infos: UserLogin, ctx: any) => {
	let isValid = await userLoginSchema.isValid(infos);
	if (!isValid) ctx.throw(403, "Invalid username or password");
};
