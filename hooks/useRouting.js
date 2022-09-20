import { useRouter } from 'next/router'

export default function useRouting() {
	const router = useRouter()

	return {
		...router,
		redirect: (path, options) => router.push(path, undefined, options)
	}
}
