import express from "express";
import passport from "passport";
import { handleMain, kakaoCallback, kakaoLogin, kakaoLogout } from "../controller/main-controller";

const mainRouter = express.Router();

mainRouter.get("/", handleMain);
// kakao login
mainRouter.get("/auth/kakao", kakaoLogin);
mainRouter.get("/auth/logout", kakaoLogout);
mainRouter.get("/auth/kakao/callback", passport.authenticate("kakao", { failureRedirect: "/" }), kakaoCallback);

export default mainRouter;
