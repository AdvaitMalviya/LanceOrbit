import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProposals() {
  const { data, error, isLoading, mutate } = useSWR("/api/proposals", fetcher)

  return {
    proposals: data || [],
    isLoading,
    error,
    mutate,
  }
}
