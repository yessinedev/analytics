import mongoose, { model, Schema } from "mongoose";

export interface IVisitor extends Document {
  visitorId: string;
  projectId: mongoose.Types.ObjectId;
  firstSeen: Date;
  lastSeen: Date;
  sessions: string[];
}

const VisitorSchema = new Schema<IVisitor>({
  visitorId: { type: String, required: true, index: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  firstSeen: { type: Date, required: true },
  lastSeen: { type: Date, required: true },
  sessions: [{ type: String }],
});

export const VisitorModel = model<IVisitor>('Visitor', VisitorSchema);
