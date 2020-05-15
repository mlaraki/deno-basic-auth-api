import { Application, Router } from "./deps.ts";
import client from "./db/client.ts";
import { register } from "./controllers/register.ts";
import { login } from "./controllers/login.ts";

const port = 3000;
const app = new Application();
const router = new Router();

router.post("/register" , register);
router.post("/login" , login);

app.use(router.routes());

console.log("listening on port : ", port);
await app.listen({ port });
await client.end();

export { app , router };