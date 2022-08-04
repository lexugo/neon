import { useState, useContext, useMemo } from 'react'
import useSuspense from '../hooks/useSuspense'

import { Suspenseful } from '../contexts'

function useSuspenseful() {
	const context = useContext(Suspenseful)
	const [suspended, setSuspended] = useState([])
	const [suspending, setSuspending] = useState([])

	function suspend(id) {
		if (suspended.includes(id)) return

		setSuspended(suspended => [...suspended, id])
		if (context.raise) context.raise(id)
	}

	function unsuspend(id) {
		setSuspended(suspended => suspended.filter(i => i !== id))
		if (context.lower) context.lower(id)
	}

	function raise(id) {
		if (suspending.includes(id)) return

		setSuspending(suspending => [...suspending, id])
		if (context.raise) context.raise(value)
	}

	function lower(id) {
		setSuspending(suspending => suspending.filter(i => i !== id))
		if (context.lower) context.lower(id)
	}

	return {
		suspended: useMemo(() => !!suspended.length, [suspended]),
		suspend, unsuspend,
		suspending: useMemo(() => !!suspending.length, [suspending]),
		raise, lower
	}
}

export default function Suspense({ children, fallback }) {
	const context = useSuspenseful()

	return (
		<Suspenseful.Provider value={context}>
			{ context.suspended.length ? fallback : children }
		</Suspenseful.Provider>
	)
}

export function suspenseful(render) {
	function Component(props) {
		const { suspended } = useSuspense()
		return render(props, suspended)
	}
	Component.displayName = render.name

	return function Suspense(props) {
		const context = useSuspenseful()

		return (
			<Suspenseful.Provider value={context}>
				<Component {...props} />
			</Suspenseful.Provider>
		)
	}
}
