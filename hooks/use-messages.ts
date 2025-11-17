import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR("/api/messages", fetcher)

  return {
    messages: data || [],
    isLoading,
    error,
    mutate,
  }
}
