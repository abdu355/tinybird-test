import useSWR from 'swr'
function useTinybird(query) {
    const fetcher = (...args) => fetch(...args,
        {
            method: 'POST',
            body: JSON.stringify(query)
        }
    ).then(res => res.json())
    const { data, error } = useSWR(`/api/tinybird`, fetcher)

    return {
        data: data?.data || [],
        stats: data?.stats || [],
        isLoading: !error && !data,
        isError: error
    }
}
export default useTinybird
