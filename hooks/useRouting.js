import { useRouter } from 'next/router'

export default function useRouting() {
	const router = useRouter()

	return {
		redirect: (path, options) => router.push(path, undefined, { shallow: true, ...options })
	}
}
