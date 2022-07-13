import { useState } from 'react'
import { useWindowListener } from './useEventListener'

export default function useDevice(expected) {
	const [device, setDevice] = useState(getDevice)
	useWindowListener('resize', () => setDevice(getDevice()))

	return expected ? device === expected : device
}

function getDevice() {
	if (typeof window === 'undefined') return 'fullscreen'

	if (window.matchMedia('(min-width: 1344px)').matches) return 'fullscreen'
	if (window.matchMedia('(min-width: 1200px)').matches) return 'widescreen'
	if (window.matchMedia('(min-width: 992px)').matches) return 'desktop'
	if (window.matchMedia('(min-width: 647px)').matches) return 'tablet'
	if (window.matchMedia('(min-width: 339px)').matches) return 'mobile'

	return 'mobile'
}
