import { useEffect } from 'react'

export function useEventListener(on, type, listener, when) {
	useEffect(() => {
		if (when && !when.every(condition => condition)) return

		on.addEventListener(type, listener)
		return () => on.removeEventListener(type, listener)
	}, [...when, on, type])
}

export function useWindowListener(type, listener) {
	useEffect(() => {
		window.addEventListener(type, listener)
		return () => window.removeEventListener(type, listener)
	}, [type])
}
