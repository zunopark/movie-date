import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";

import mainRouter from "./api/router/main-router";
import "./passport";

mongoose.Promise = global.Promise;

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === "production" ? ".env" : ".env.dev"),
});

const app = express();
const CookieStore = MongoStore(session);

// template
app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static("assets"));
// app.use("/uploads", express.static("uploads"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
