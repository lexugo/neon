import { useEffect, useState } from 'react'

export default function useMount(effect) { // TODO: deprecate
	const [mounted, setMounted] = useState(false)
	useEffect(() => { mounted ? effect() : setMounted(true) }, [mounted])
}
