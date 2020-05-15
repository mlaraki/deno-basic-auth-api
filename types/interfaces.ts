interface User {
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	[key: string]: string;
}

interface UserLogin {
	username: string;
	password: string;
}

export {
	User,
	UserLogin
}