import { useRouter } from 'next/router'

export default function useParam(name) {
    const { query, pathname, replace, push } = useRouter()

    function toUrl(value) {
        if (value)
            return { pathname, query: { ...query, [name]: value }}

        const { [name]: _, ...params } = query // Remove param form url when undefined
        return { pathname, query: params }
    }

    return [
        query[name],
        value => replace(toUrl(value), undefined, { shallow: true }),
        value => push(toUrl(value), undefined, { shallow: true })
    ]
}
