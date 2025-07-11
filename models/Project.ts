import mongoose, { model, Schema } from "mongoose";

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  domain: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  domain: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true, index: true },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

ProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const ProjectModel = model<IProject>('Project', ProjectSchema);
