# Deno basic auth api

## Postgres

```sql
CREATE DATABASE <DATABASE NAME>;
```

```sql
CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	username VARCHAR(30) NOT NULL,
	firstname VARCHAR(30) NOT NULL,
 	lastname VARCHAR(30) NOT NULL,
 	email VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	UNIQUE (username, email)
);
```
## Environment variables

```bash
echo "CONNECTION=<Your Postgres connection string>" > .env && rm -rf .env.example
```

## Run

```bash
deno run --allow-net --allow-read main.ts
```

### Register

```bash
curl --request POST \
  --url http://localhost:3000/register/ \
  --header 'content-type: application/json' \
  --data '{"username" : "deno","firstname" : "test","lastname" : "test","email" : "deno@land.com","password" : "123456"}'
```

### Login

```bash
curl --request POST \
  --url http://localhost:3000/login/ \
  --header 'content-type: application/json' \
  --data '{"username" : "deno","firstname" : "test","lastname" : "test","email" : "deno@land.com","password" : "123456"}'
```
