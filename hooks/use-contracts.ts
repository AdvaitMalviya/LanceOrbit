import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useContracts() {
  const { data, error, isLoading, mutate } = useSWR("/api/contracts", fetcher)

  return {
    contracts: data || [],
    isLoading,
    error,
    mutate,
  }
}
