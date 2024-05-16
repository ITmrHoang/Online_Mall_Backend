import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routers/index.cjs";
import usersRouter from "./routers/users.cjs";
import authRouter from "./routers/auth.js";

// get file name and root path
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Đăng ký alias
// const __dirname = path.resolve();

var app = express();

// load environment variables
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "App";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Router register

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

app.get("/infor-app", (req, res) => {
  res.send({
    name: APP_NAME,
  });
});

app.get("/test", (req, res) => {
  res.send({
    name: APP_NAME,
  });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
