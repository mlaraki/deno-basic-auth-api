import { UserLogin } from "../types/interfaces.ts";
import { loginValidation } from "../services/loginValidation.ts";
import { checkUser } from "../db/loginUser.ts";

export const login = async (ctx: any) => {
	const body = await ctx.request.body();
	let infos: UserLogin = body.value;
	await loginValidation(infos, ctx);
	let username = await checkUser(infos, ctx);

	ctx.response.body = {
		message: `Successfully logged as ${username} to 🦕 Deno auth-api 🦕`,
		error: false,
	};
}