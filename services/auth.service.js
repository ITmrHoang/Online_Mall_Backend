import { BaseService } from "../core/database.js";
import { RefreshToken } from "./refreshtoken.service.js";
import { UserService } from "./user.service.js";
import { hashPassword, comparePassword } from "../core/helpers.js";
import {
    createToken,
    createRefreshToken,
    verifyToken,
  } from "../core/authentication.js";
export class AuthService extends BaseService {
  constructor() {
    super();
    this.user = new UserService();
  }
  async login(username, password) {
    const user = await this.user.findUnique({
      username: username,
    });
    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    console.log(password,  user.password);

    if (!comparePassword(password, user.password)) {
        return Promise.reject({ status: 401, message: 'Invalid password' });
    }
    const accessToken = createToken({ username: username });
    const refreshToken = createRefreshToken({ username: username });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}

export default new AuthService();
