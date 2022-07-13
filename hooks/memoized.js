import { useMemo } from 'react'

export default function memoized(func) {
	return function useMemoized(...args) {
		return useMemo(() => func(...args), args)
	}
}
