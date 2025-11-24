import { NextResponse } from "next/server";
import { db } from "@/database";
import { locations } from "@/database/schema";

export async function GET() {
  const existing = await db.select().from(locations).limit(1);

  if (existing.length === 0) {
    await db.insert(locations).values({
      name: "Main Branch",
      city: "Tripoli",
      country: "Libya",
    });
  }

  const allLocations = await db.select().from(locations);

  return NextResponse.json({ locations: allLocations });
}
