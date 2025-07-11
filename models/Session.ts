import mongoose, { model, Schema } from "mongoose";

export interface ISession extends Document {
  sessionId: string;
  visitorId: string;
  projectId: mongoose.Types.ObjectId;
  startedAt: Date;
  endedAt?: Date;
  duration?: number; // ms
  pagesVisited: string[];
}

const SessionSchema = new Schema<ISession>({
  sessionId: { type: String, required: true, index: true },
  visitorId: { type: String, required: true, index: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date },
  duration: { type: Number },
  pagesVisited: [{ type: String }],
});

export const SessionModel = model<ISession>('Session', SessionSchema);
