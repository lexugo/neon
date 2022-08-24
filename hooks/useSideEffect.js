import { useEffect } from 'react'

/**
 * Accepts an asynchronous function that contains imperative, possibly side-effecting code.
 * @param effect {() => Promise<void>} Asynchronous imperative function
 * @param deps {*[]?} If present, effect will only activate if the values in collection have changed
 */
export default function useSideEffect(effect, deps) {
	useEffect(() => { effect() }, deps)
}
