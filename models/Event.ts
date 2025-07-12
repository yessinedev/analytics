import mongoose, { Schema } from "mongoose";

export interface IEvent extends Document {
  eventType: string;
  timestamp: Date;
  visitorId: string;
  sessionId: string;
  country: string;
  properties: Record<string, any>;
  context: {
    userAgent: string;
    language: string;
    screenSize: string;
    pageUrl: string;
    referrer: string;
  };
}

const EventSchema = new Schema<IEvent>({
  eventType: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true, index: true },
  visitorId: { type: String, required: true, index: true },
  sessionId: { type: String, required: true, index: true },
  country: { type: String },
  properties: { type: Schema.Types.Mixed },
  context: {
    userAgent: { type: String },
    language: { type: String },
    screenSize: { type: String },
    pageUrl: { type: String },
    referrer: { type: String },
  },
});

export const EventModel = mongoose.models.Event
  ? (mongoose.models.Event as mongoose.Model<IEvent>)
  : mongoose.model<IEvent>("Event", EventSchema);
