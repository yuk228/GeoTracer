import { useFormik } from "formik";
import * as yup from "yup";

type FormValues = {
  url: string;
  discordWebhook?: string;
  token: string;
};

export function useCreateUrlHooks() {
  const formik = useFormik({
    initialValues: {
      url: "",
      discordWebhook: "",
      token: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      url: yup.string().required("URL is required").url("Invalid URL"),
      discordWebhook: yup.string().optional().url("Invalid URL"),
      token: yup.string().required("Solve the captcha to continue"),
    }),
    onSubmit: (values: FormValues) => {
      console.log(values);
    },
  });

  return {
    formik,
  };
}
