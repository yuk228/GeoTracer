'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUrlHooks } from '@/services/hooks/url-hooks'
import { useParams } from 'next/navigation'
import { CopyButton } from '@/components/shared/copy-button'
import { formatDateTime } from '@/services/shared/format-datetime'
import { Input } from '@/components/ui/input'

function Loading() {
  return (
    <main className="min-h-screen flex w-full items-center justify-center">
      <Spinner />
    </main>
  )
}

export default function Page() {
  const params = useParams<{ uuid: string }>()
  const uuid = params.uuid
  const { data, isLoading } = useUrlHooks({ uuid })

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 p-6 pb-12 md:p-10">
      <Header />
      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Short URL
                </p>
                <p className="block break-all text-sm font-medium text-primary underline-offset-4 hover:underline">
                  {data.slug}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Redirect
                </p>
                {data.redirectUrl}
                <CopyButton content={data.redirectUrl} />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Created At
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatDateTime(data.createdAt)}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Updated At
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formatDateTime(data.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button asChild size="sm"></Button>
          </CardFooter>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle>Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Total Accesses
              </p>
              <p className="text-3xl font-semibold leading-tight">
                {data.logs.length}
              </p>
              {data.logs[0] && (
                <p className="text-xs text-muted-foreground">
                  Last Access: {formatDateTime(data.logs[0].createdAt || '')}
                </p>
              )}
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Discord Webhook
              </p>
              {data.discordWebhook ? (
                <div className="flex space-y-2">
                  <Input
                    className="rounded-md"
                    value={data.discordWebhook}
                    readOnly
                  />
                  <CopyButton content={data.discordWebhook} />
                </div>
              ) : (
                <Badge variant="outline" className="w-fit">
                  Not set
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Access Logs</CardTitle>
          <CardDescription>
            View recorded access history and user agents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[10rem]">Timestamp</TableHead>
                  <TableHead className="min-w-[8rem]">IP Address</TableHead>
                  <TableHead className="min-w-[16rem]">User-Agent</TableHead>
                  <TableHead className="min-w-[8rem] text-right">
                    Advanced
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.logs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-6 text-center text-sm text-muted-foreground"
                    >
                      No access logs yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.logs.map((log, index) => (
                    <TableRow
                      key={`${log.ipAddress}-${log.createdAt}-${index}`}
                    >
                      <TableCell className="whitespace-nowrap">
                        {log.createdAt}
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-mono text-xs">
                        {log.ipAddress}
                      </TableCell>
                      <TableCell
                        className="max-w-[32rem] truncate"
                        title={log.userAgent}
                      >
                        {log.userAgent}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

function Header() {
  return (
    <>
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
      </header>
      <Separator />
    </>
  )
}
