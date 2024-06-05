import jwt from "jsonwebtoken";
import { SECRET_KEY, EXPIRES_TOKEN, SECRET_KEY_REFRESH, EXPIRES_REFRESH } from "./constants.js";

// Hàm tạo token
export function createToken(data, exp = null) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: exp ?? EXPIRES_TOKEN });
}

export function createRefreshToken(data, exp = null) {
  return jwt.sign(data, SECRET_KEY_REFRESH, {
    expiresIn: exp ?? EXPIRES_REFRESH,
  });
}

export function verifyToken(token) {
  try {
    let decoded = jwt.verify(token, SECRET_KEY);
    return Promise.resolve(decoded);
  } catch (err) {
    console.log(err);
    return Promise.reject("Invalid token");
  }
}

export function verifyRefreshToken(token) {
  try {
    let decoded = jwt.verify(token, SECRET_KEY_REFRESH);
    return Promise.resolve(decoded);
  } catch (err) {
    console.log(err);
    return Promise.reject("Invalid refresh token");
  }
}
