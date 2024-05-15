import express from "express";
import {
  createToken,
  createRefreshToken,
  verifyToken,
} from "../core/authentication.js";

import { hashPassword, comparePassword} from "../core/helpers.js";

import { Router } from "express";
import { body, validationResult } from "express-validator";

import UserService from "../services/user.service.js";

const router = Router();
const userId = { id: "user_id" };
router.post(["/auth/token", "/login"], async function (req, res, next) {
  const { username, password } = req.body;
  console.log(username,password);
  const user = await UserService.findUnique({
      username: username ,
  })
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if(! comparePassword(password, user.password)) {
    return res.status(404).json({ message: "Password dont matching" });

  }
  const accessToken = createToken({username: username});
  const token_refresh = createRefreshToken({username: username});
  res.json({ accessToken, refreshToken: token_refresh });
});

// Route để kiểm tra token
router.get(["/auth/check-token", "/auth/user"], (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.sendStatus(401);
  }

  // Kiểm tra tính hợp lệ của token
  return verifyToken(token)
    .then((decoded) => {
      return res.json({ data: decoded });
    })
    .catch((err) => {
      return res.status(403).json({ message: "Token is invalid" });
    });
});

// Route để refresh access token bằng refresh token
router.post("/auth/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "Token is invalid" });
  }
  // Nếu refresh token hợp lệ, tạo mới access token
  verifyToken(refreshToken)
    .then((decoded) => {
      delete decoded.message;
      const { exp, ..._decoded } = decoded;
      console.log(_decoded);

      const accessToken = createToken(_decoded);
      return res.json({ accessToken });
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ message: "Token is invalid" });
    });
});

router.post(
  "/register",
  [
    body("username").notEmpty().isString()
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 chars long"),
    body("email").isEmail().notEmpty().isString().withMessage("Email must be valid"),
    body("password").notEmpty().isString()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 chars long"),
    body("confirm_password").notEmpty().isString().custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    
    try {
      const data =  await UserService.create({username, email, 'password': hashPassword(password)})
      res.json({ message: "Create successfuly" });
    } catch (err) {
      res.status(400).json({ errors: err.message });

    }
  }
);

export default router;
