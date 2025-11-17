import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR("/api/projects", fetcher)

  return {
    projects: data || [],
    isLoading,
    error,
    mutate,
  }
}
