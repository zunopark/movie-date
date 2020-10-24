import express from "express";
import passport from "passport";
import { handleLogin, handleMain, kakaoCallback, kakaoLogin, kakaoLogout } from "../controller/main-controller";

const mainRouter = express.Router();

mainRouter.get("/", handleMain);
mainRouter.get("/login", handleLogin);
// kakao login
mainRouter.get("/auth/kakao", kakaoLogin);
mainRouter.get("/auth/logout", kakaoLogout);
mainRouter.get("/auth/kakao/callback", passport.authenticate("kakao", { failureRedirect: "/" }), kakaoCallback);

export default mainRouter;
