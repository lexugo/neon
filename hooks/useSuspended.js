import useSuspense from './useSuspense'
import { useState, useCallback } from 'react'

export default function useSuspended(func) {
	const [_, suspend] = useSuspense()
	const [error, setError] = useState()

	if (error) throw error
	return useCallback(async (...args) => {
		try {
			suspend(true)
			return await func(...args)
		} catch(error) {
			console.error(error)
			setError(error)
		} finally {
			suspend(false)
		}
	}, [func])
}
