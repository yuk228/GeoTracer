import { prisma } from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { validateToken } from '@/services/validateToken'
import { BadRequest } from '@/services/apiResponse'

export async function POST(request: NextRequest) {
  const { url, discordWebhook, token } = await request.json()
  const slug = Math.random().toString(36).substring(2, 15)
  if (!(await validateToken(token))) {
    return BadRequest()
  }

  const result = await prisma.url.create({
    data: {
      slug,
      discordWebhook,
      redirectUrl: url,
    },
    select: {
      redirectUrl: true,
      discordWebhook: true,
      adminUuid: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json(result)
}
