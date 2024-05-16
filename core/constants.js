import dotenv from "dotenv";
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || "secret";
export const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH || "secret";
export const EXPIRES_TOKEN = process.env.EXPIRES_TOKEN || 1000 * 60 * 60 * 24;
export const EXPIRES_REFRESH = process.env.EXPIRES_REFRESH || "7d";

export const DB_USER = process.env.DB_USER || "himo";
export const DB_PASSWORD = process.env.DB_USER || "secret";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 6666;
export const DB_NAME = process.env.DB_NAME || "online_mall";

export const DB_SERVICE = process.env.DB_SERVICE || "postgres";
