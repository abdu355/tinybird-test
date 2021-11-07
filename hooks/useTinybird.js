import useSWR from 'swr'
import isEmpty from '@utils/isEmpty'

function useTinybird(query) {
    if (!query.params) throw new Error('useTinybird query params are required');
    const fetcher = (...args) => fetch(...args,
        {
            method: 'POST',
            body: JSON.stringify(query.params)
        }
    ).then(res => res.json())
    const { data, error } = useSWR(`/api/tinybird/${query.pipe}`, fetcher)
    return {
        data: data?.data,
        stats: data?.stats,
        isLoading: !error && !data,
        isError: error || isEmpty(data)
    }
}
export default useTinybird
