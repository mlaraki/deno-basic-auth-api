import { Client } from "https://deno.land/x/postgres/mod.ts";
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const ENV = config();
const psql_config = ENV.CONNECTION ;
const client = new Client(psql_config);

try {
	await client.connect();
	console.log("\x1b[32m %s \x1b[0m", "🦕 DB connected 🦕");
} catch (error) {
	console.log("\x1b[31m", "💩 Connection error 💩: ", error.stack);
	throw error;
}

export default client;
