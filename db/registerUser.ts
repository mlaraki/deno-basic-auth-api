import { User } from "../types/interfaces.ts";
import client from "./client.ts";

export const createUser = async (infos: User, hashedPassword: string, ctx: any): Promise<number> => {
	try {
		let { username, firstname, lastname, email } = infos;
		const result = await client.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING (id)",
			username, firstname, lastname, email, hashedPassword,
		);
		return result.rows[0][0];
	} catch (error) {
		return ctx.throw(500, `💩 ${error.message} 💩`);
	}
}