import { useContext, useCallback, useId } from 'react'

import { Suspenseful } from '../contexts'

export default function useSuspense() {
	const id = useId()
	const { suspended, suspending, suspend, unsuspend } = useContext(Suspenseful)

	return {
		suspended,
		suspending,
		suspend: useCallback((suspended = true) => suspended ? suspend(id) : unsuspend(id), [id]),
		unsuspend: useCallback(() => unsuspend(id), [id])
	 }
}
