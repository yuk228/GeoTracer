import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/validateToken";
import { BadRequest } from "@/lib/apiResponse";

export async function POST(request: NextRequest) {
  const { url, discordWebhook, token } = await request.json();

  if (!(await validateToken(token))) {
    return BadRequest();
  }

  const result = await prisma.url.create({
    data: {
      slug: url,
      discordWebhook,
      redirectUrl: url,
    },
  });

  return NextResponse.json(result);
}
