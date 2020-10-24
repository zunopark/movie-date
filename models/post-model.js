import mongoose from "mongoose";

// 제안서
const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  state: { type: String, required: true, default: "waiting" },
  date: { type: Date, deafult: Date.now },
  accept: { type: Boolean, deafult: null },

  // 나와 연결시킬 상대방 저장, 일단은 임시로 내 id 로 저장
  connected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 매치 되었을 시 타임 테이블 작성을 위해
  timetable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Timetable",
  },

  // 여자가 최종 선택을 하면 choice 에 최종 선택한 시간표가 들어간다.
  choice: { type: String, deafult: null },

  // 관리자가 예매한 영화표 보여주는 페이지, 아직 이미지 타입 미완성
  ticketImg: { type: String, default: null },
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;
