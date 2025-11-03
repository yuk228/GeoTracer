import { UrlDTO } from '@/entities/url'
import { NotFound } from '@/services/apiResponse'
import { prisma } from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await context.params
  const data = await prisma.url.findFirst({
    where: { adminUuid: uuid },
    include: {
      logs: { orderBy: { createdAt: 'desc' } },
    },
  })
  if (!data) {
    return NotFound()
  }
  const dto: UrlDTO = {
    slug: data.slug,
    redirectUrl: data.redirectUrl ?? '',
    discordWebhook: data.discordWebhook ?? '',
    adminUuid: data.adminUuid,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
    logs: data.logs.map(log => ({
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      referer: log.referer ?? '',
      latitude: log.latitude ?? 0,
      longitude: log.longitude ?? 0,
      createdAt: log.createdAt.toISOString(),
      updatedAt: log.updatedAt.toISOString(),
    })),
  }
  return NextResponse.json(dto, { status: 200 })
}
