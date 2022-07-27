import { useState } from 'react'
import useSuspense from '../hooks/useSuspense'

import { Suspenseful } from '../contexts'

export default function Suspense({ children, fallback }) {
	const [suspended, suspend] = useState(false)

	return (
		<Suspenseful.Provider value={[suspended, suspend]}>
			{ suspended ? fallback : children }
		</Suspenseful.Provider>
	)
}

export function suspenseful(render) {
	function Component(props) {
		const [ suspended ] = useSuspense()
		return render(props, suspended)
	}
	Component.displayName = render.name

	return function Suspense({ props }) {
		const [suspended, suspend] = useState(false)

		return (
			<Suspenseful.Provider value={[suspended, suspend]}>
				<Component {...props} />
			</Suspenseful.Provider>
		)
	}
}
