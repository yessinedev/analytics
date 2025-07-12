import connectDB from "@/lib/connectDB";
import { EventModel } from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const events = Array.isArray(body) ? body : [body];
    let timestamp = body.timestamp;
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      timestamp = new Date();
    }
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "24.48.0.1"; // fallback for dev
    const geoRes = await fetch(`http://ip-api.com/json/24.48.0.1`);
    const geo = await geoRes.json();
    const country = geo.country || "Unknown";
    console.log(country);
    const savedEvents = await Promise.all(
      events.map(async (e) => {
        const event = new EventModel({
          eventType: e.eventType,
          visitorId: e.visitorId,
          sessionId: e.sessionId,
          timestamp: timestamp,
          properties: e.properties || {},
          country,
          context: {
            userAgent: e.context?.userAgent || "",
            language: e.context?.language || "",
            screenSize: e.context?.screenSize || "",
            pageUrl: e.context?.pageUrl || "",
            referrer: e.context?.referrer || "",
          },
        });
        console.log("Saving event:", event);
        const saved = await event.save();
        return saved;
      })
    );

    return new Response(
      JSON.stringify({ message: "Events saved", count: savedEvents.length }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "🔥 Error in POST /api/events:",
      error.message,
      error.errors || error
    );
    return new Response("Internal Server Error", { status: 500 });
  }
}
