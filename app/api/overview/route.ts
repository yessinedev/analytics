import connectDB from "@/lib/connectDB";
import { EventModel } from "@/models/Event";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const uniqueVisitors = await EventModel.distinct("visitorId", {});

    const totalSessions = await EventModel.countDocuments({
      eventType: "session_start",
    });

    const pageViews = await EventModel.countDocuments({
      eventType: "page_view",
    });

    const topReferers = await EventModel.aggregate([
      {
        $match: {
          eventType: "session_start",
        },
      },
      { $group: { _id: "$context.referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const topCountries = await EventModel.aggregate([
      {
        $match: {
          eventType: "session_start",
        },
      },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    return new Response(
      JSON.stringify({
        uniqueVisitors: uniqueVisitors.length,
        totalSessions,
        pageViews,
        topReferers: topReferers.map((r) => ({
          referer: r._id,
          count: r.count,
        })),
        topCountries: topCountries.map((c) => ({
          country: c._id,
          count: c.count,
        })),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/overview:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
