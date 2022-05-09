import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.txdq5.mongodb.net/myFirstDatabase`;
const MONGO_TESTDB_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.txdq5.mongodb.net/testdb`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const devConfig = {
	mongo: {
		username: MONGO_USERNAME,
		password: MONGO_PASSWORD,
		url: MONGO_URL,
	},
	server: {
		port: SERVER_PORT,
	},
};

const testConfig = {
	mongo: {
		...devConfig.mongo,
		url: MONGO_TESTDB_URL,
	},
	server: {
		port: 8888,
	},
};

export const config = process.env.NODE_ENV === 'test' ? testConfig : devConfig;
