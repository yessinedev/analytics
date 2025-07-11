import connectDB from "@/lib/connectDB";
import { EventModel } from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    let timestamp = body.timestamp;
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      timestamp = new Date();
    }

    const event = new EventModel({
      eventType: body.eventType,
      timestamp: timestamp,
      visitorId: body.visitorId,
      sessionId: body.sessionId,
      properties: body.properties || {},
      context: {
        userAgent: body.context?.userAgent || "",
        language: body.context?.language || "",
        screenSize: body.context?.screenSize || "",
        pageUrl: body.context?.pageUrl || "",
        referrer: body.context?.referrer || "",
      },
    });
    await event.save();
    return new NextResponse(JSON.stringify({ success: true, event }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/events:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
