import { UrlDTO } from '@/entities/url'
import { FormikProps, useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'

type FormValues = {
  url: string
  discordWebhook?: string
  token: string
}

export type CreateUrlHooks = {
  formik: FormikProps<FormValues>
  isMutating: boolean
  data: UrlDTO
}

export function useCreateUrlHooks() {
  const router = useRouter()
  async function createUrl(
    url: string,
    { arg }: { arg: FormValues }
  ): Promise<UrlDTO> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    return response.json()
  }

  const { trigger, data, isMutating } = useSWRMutation('/api/url', createUrl)
  const formik = useFormik({
    initialValues: {
      url: '',
      discordWebhook: '',
      token: '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      url: yup.string().required('URL is required').url('Invalid URL'),
      discordWebhook: yup.string().optional().url('Invalid URL'),
      token: yup.string().required('Solve the captcha to continue'),
    }),
    onSubmit: async (values: FormValues) => {
      try {
        const response = await trigger(values)
        router.push(`/dashboard/${response.adminUuid}`)
      } catch (error) {
        console.error(error)
      }
    },
  })

  return {
    formik,
    isMutating,
    data,
  }
}
