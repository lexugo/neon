import useSuspense from './useSuspense'
import { useState, useCallback } from 'react'

export default function useSuspended(func) {
	const { suspend } = useSuspense()
	const [error, log] = useState()

	if (error) throw error
	return useCallback(async (...args) => {
		try {
			suspend(true)
			return await func(...args)
		} catch(error) {
			console.error(error)
			log(error)
		} finally {
			suspend(false)
		}
	}, [func])
}
