import passport from "passport";
import dotenv from "dotenv";
import mongoose from "mongoose";
import KakaoLogin from "passport-kakao";

// models
import User from "./models/user-model";
import Posts from "./models/post-model";
import Profile from "./models/profile-model";
import Timetable from "./models/timetable-model";

dotenv.config();
passport.use(User.createStrategy());

passport.use(
  new KakaoLogin(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: "http://localhost:3000/auth/kakao/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // 사용자의 정보는 profile에 들어있다.
      const {
        _json: { id },
      } = profile;
      const kId = id;
      try {
        const user = await User.findOne({ kakaoId: kId });
        if (user) {
          user.kakaoId = kId;
          user.save();
          return done(null, user);
        }
        const userId = new mongoose.Types.ObjectId();
        const newUser = new User({
          _id: userId,
          kakaoId: kId,
          profile: userId,
        });
        newUser
          .save()
          .then((result) => {
            const newProfile = new Profile({
              _id: userId,
            });
            newProfile.save();
          })
          .then((result) => {
            const newPost = new Posts({
              _id: userId,
              connected: userId,
              timetable: userId,
            });
            newPost.save();
          })
          .then((result) => {
            const newTimetable = new Timetable({
              _id: userId,
            });
            newTimetable.save();
          })
          .catch((err) => {
            console.log(err);
          });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
