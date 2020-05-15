import { bcrypt } from "../deps.ts";
import { User } from "../types/interfaces.ts";
import { formatBody, registerValidation } from "../services/registerValidation.ts";
import { createUser } from "../db/registerUser.ts";

const generateHashedPassword = async (password: string, ctx: any): Promise<string> => {
	try {
		const salt = await bcrypt.gensalt();
		const hashedPassword = bcrypt.hashpw(password, salt);
		return hashedPassword;
	} catch (error) {
		return ctx.throw(500, `💩 ${error.message} 💩`);
	}
};

export const register = async (ctx: any) => {
	const body = await ctx.request.body();
	let infos: User = formatBody(body.value);
	await registerValidation(infos, ctx);
	let hashedPassword = await generateHashedPassword(infos.password, ctx);
	let userID = await createUser(infos, hashedPassword, ctx);

	ctx.response.body = {
		id: userID,
		message: "Successfully Registered to 🦕 Deno auth-api 🦕",
		error: false,
	};
}