import { Schema, model } from "mongoose";

interface Session {
  token: string;
}

const SessionSchema = new Schema<Session>(
  {
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Session", SessionSchema);
