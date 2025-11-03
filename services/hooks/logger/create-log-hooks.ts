import { LogResponse } from '@/entities/url'
import useSWRMutation from 'swr/mutation'
import { FormikProps, useFormik } from 'formik'

type Props = {
  slug: string
}

type FormValues = {
  slug: string
  referer: string
  latitude: number
  longitude: number
}

export type CreateLogHooks = {
  formik: FormikProps<FormValues>
  isMutating: boolean
  data: LogResponse
}

export function useCreateLogHooks({ slug }: Props) {
  async function createLog(
    url: string,
    { arg }: { arg: FormValues }
  ): Promise<LogResponse> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })
    return response.json()
  }
  const { trigger, data, isMutating } = useSWRMutation(`/api/log`, createLog)
  const formik = useFormik({
    initialValues: {
      slug,
      latitude: 0,
      longitude: 0,
      referer: '',
    },
    enableReinitialize: true,
    onSubmit: async (values: FormValues) => {
      try {
        const response = await trigger(values)
        window.location.href = response.redirectUrl
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
