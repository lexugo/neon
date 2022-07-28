import useSuspense from './useSuspense'
import { useState, useCallback } from 'react'

export default function useSuspended(func) {
	const { suspend, unsuspend } = useSuspense()
	const [error, log] = useState()

	if (error) throw error
	return useCallback(async (...args) => {
		suspend()
		return func(...args).catch(log).finally(unsuspend)
	}, [func])
}
