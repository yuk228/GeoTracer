'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateUrlHooks } from '@/services/hooks/create-url-hooks'
import { ErrorMessage } from '@/components/shared/error-message'
import { Turnstile } from 'next-turnstile'
import { Logo } from '@/components/shared/logo'

export default function Page() {
  const { formik, isMutating } = useCreateUrlHooks()
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Logo />
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
              <ErrorMessage>{formik.errors.url}</ErrorMessage>
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
              <ErrorMessage>{formik.errors.discordWebhook}</ErrorMessage>
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
