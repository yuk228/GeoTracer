'use client'

import { useUrlHooks } from '@/lib/hooks/url-hooks'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const uuid = params.uuid as string
  const { data, isLoading } = useUrlHooks({ uuid })
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Logs</p>
      </div>

      {data ? (
        <div className="space-y-6">
          <section className="rounded-lg border p-4">
            <h2 className="text-lg font-medium">Overview</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Short URL</p>
                <a
                  className="text-sm underline break-all"
                  href={`/${data.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/${data.slug}`}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Redirect URL</p>
                <a
                  className="text-sm underline break-all"
                  href={data.redirectUrl ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.redirectUrl ?? '(未設定)'}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admin UUID</p>
                <p className="font-mono text-sm break-all">{uuid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-sm">{data.createdAt}</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border p-4">
            <h2 className="text-lg font-medium">アクセスログ</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2">日時</th>
                    <th className="px-3 py-2">IP</th>
                    <th className="px-3 py-2">User-Agent</th>
                    <th className="px-3 py-2">Referer</th>
                    <th className="px-3 py-2">緯度</th>
                    <th className="px-3 py-2">経度</th>
                  </tr>
                </thead>
                <tbody>
                  {data.logs.length === 0 ? (
                    <tr>
                      <td
                        className="px-3 py-4 text-muted-foreground"
                        colSpan={6}
                      >
                        ログはまだありません
                      </td>
                    </tr>
                  ) : (
                    data.logs.map((log, index) => (
                      <tr key={index} className="border-b last:border-none">
                        <td className="px-3 py-2 whitespace-nowrap">
                          {log.createdAt}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {log.ipAddress}
                        </td>
                        <td
                          className="px-3 py-2 min-w-64 max-w-[32rem] truncate"
                          title={log.userAgent}
                        >
                          {log.userAgent}
                        </td>
                        <td
                          className="px-3 py-2 max-w-[28rem] truncate"
                          title={log.referer ?? ''}
                        >
                          {log.referer ?? '-'}
                        </td>
                        <td className="px-3 py-2">{log.latitude ?? '-'}</td>
                        <td className="px-3 py-2">{log.longitude ?? '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : (
        <div className="rounded-lg border p-4">データが見つかりません</div>
      )}
    </main>
  )
}
