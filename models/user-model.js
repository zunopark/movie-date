import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  kakaoId: Number,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "_id",
});

const userModel = mongoose.model("User", UserSchema);
export default userModel;
