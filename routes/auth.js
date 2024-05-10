import express from "express";
import {
  createToken,
  createRefreshToken,
  verifyToken,
} from "../core/authentication.js";

import { Router } from "express";

const router = Router();
const userId = { id: "user_id" };
router.get(["/auth/token", "/login"], function (req, res, next) {
  const accessToken = createToken(userId);
  const token_refresh = createRefreshToken(userId);
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
  console.log(req.data, req.body, refreshToken)
  if (!refreshToken ) {
    return res.status(403).json({ message: "Token is invalid" });
  }
  // Nếu refresh token hợp lệ, tạo mới access token
  verifyToken(refreshToken)
    .then((decoded) => {
      delete decoded.message;
      const {exp, ..._decoded} = decoded;
      console.log(_decoded)

      const accessToken = createToken(_decoded)
      return res.json({ accessToken });
    })
    .catch((err) => {
      console.log(err)
      return res.status(403).json({ message: "Token is invalid" });
    });
 
});

export default router;
