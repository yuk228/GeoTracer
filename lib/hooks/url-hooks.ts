import { UrlDTO } from "@/entities/url";
import { useRouter } from "next/navigation";
import useSWR from "swr";

type Props = {
  uuid: string;
};

type UseUrlHooks = {
  data: UrlDTO;
  error: Error;
  isLoading: boolean;
};

export function useUrlHooks({ uuid }: Props): UseUrlHooks {
  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(`/api/url/${uuid}`, fetcher);
  if (error) {
    console.error(error);
    router.push("/");
  }
  return { data, error, isLoading };
}
