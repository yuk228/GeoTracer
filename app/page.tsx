'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateUrlHooks } from '@/lib/hooks/create-url-hooks'
import { Navigation } from 'lucide-react'
import { Turnstile } from 'next-turnstile'

export default function Page() {
  const { formik, isMutating, data } = useCreateUrlHooks()
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 justify-center mt-20">
        <Navigation size={48} />
        <h1 className="text-4xl font-bold">GeoTracer</h1>
      </div>
      <div className="items-center justify-center mt-20 flex w-full max-w-md flex-col gap-2 px-4">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
          <div>
            <Input
              type="url"
              placeholder="Enter URL"
              aria-label="URL"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.url && formik.touched.url
                  ? 'border-destructive'
                  : ''
              }
            />
            {formik.errors.url && formik.touched.url && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.url}
              </p>
            )}
          </div>

          <div>
            <Input
              type="url"
              placeholder="Discord Webhook URL (optional)"
              aria-label="Discord Webhook URL"
              name="discordWebhook"
              value={formik.values.discordWebhook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.discordWebhook && formik.touched.discordWebhook
                  ? 'border-destructive'
                  : ''
              }
            />
            {formik.errors.discordWebhook && formik.touched.discordWebhook && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.discordWebhook}
              </p>
            )}
          </div>

          <Button
            className="w-full"
            type="submit"
            disabled={isMutating || !formik.isValid}
          >
            {isMutating ? 'Loading...' : 'Shorten'}
          </Button>

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onVerify={token => formik.setFieldValue('token', token)}
          />
        </form>
      </div>
    </main>
  )
}
