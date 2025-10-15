import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";
  const { slug, referer, latitude, longitude } = await request.json();

  const data = await prisma.log.create({
    data: {
      url: {
        connect: {
          slug,
        },
      },
      ipAddress: ip,
      userAgent,
      referer,
      latitude,
      longitude,
    },
    include: {
      url: {
        select: {
          redirectUrl: true,
        },
      },
    },
  });

  return NextResponse.json(
    { redirectUrl: data.url.redirectUrl ?? "" },
    { status: 200 }
  );
}
