import { useState } from 'react'
import useSuspense from '../hooks/useSuspense'

import { Suspenseful } from '../contexts'

function useContext() {
	const suspense = useSuspense()
	const [suspended, setSuspended] = useState(false)
	const [suspending, setSuspending] = useState(false)

	function suspend(value) {
		setSuspended(value)
		if (suspense.raise) suspense.raise(value)
	}

	function raise(value) {
		setSuspending(value)
		if (suspense.raise) suspense.raise(value)
	}

	return {
		suspended, suspend,
		suspending, raise
	}
}

export default function Suspense({ children, fallback }) {
	const context = useContext()

	return (
		<Suspenseful.Provider value={context}>
			{ context.suspended ? fallback : children }
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
		const context = useContext()

		return (
			<Suspenseful.Provider value={context}>
				<Component {...props} />
			</Suspenseful.Provider>
		)
	}
}
