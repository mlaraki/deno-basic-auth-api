import { UserLogin } from "../types/interfaces.ts";
import client from "./client.ts";
import { bcrypt } from "../deps.ts";

export const checkUser = async (infos: UserLogin, ctx: any): Promise<string> => {
	try {
		let { username, password } = infos;
		const result = await client.query("SELECT password FROM users WHERE username = $1", username);
		if (!result.rows.length) ctx.throw(403, "Invalid username or password");

		let isValid = await bcrypt.checkpw(password, result.rows[0][0]);
		if (!isValid) ctx.throw(403, "Invalid username or password");

		return username;
	} catch (error) {
		return ctx.throw(error.status, `${error.message}`);
	}
}