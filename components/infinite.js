import React, { memo, useEffect, useRef, useState } from 'react'

import useMount from '../hooks/useMount'
import { useEventListener } from '../hooks/useEventListener'

function Infinite({ horizontal, threshold = 300, initial, previous, next, children, ...props }) {
	const ref = useRef()

	// Drag
	const [dragging, setDragging] = useState(false) // Draggable when horizontal
	useEventListener(ref.current, 'mousemove', ({ movementX: x }) => {
		ref.current.scrollLeft -= x
	}, [dragging])

	// Infinite scrolling
	const [loading, setLoading] = useState(false)
	const [offset, setOffset] = useState(0)

	function handleScroll() {
		if (loading) return

		const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = ref.current
		const scroll = horizontal ? scrollLeft : scrollTop
		const remaining = horizontal
			? scrollWidth - clientWidth - scrollLeft
			: scrollHeight - clientHeight - scrollTop

		if (previous && scroll <= threshold) {
			setLoading(true)
			setOffset(horizontal ? scrollWidth : scrollHeight)
			previous()
		} else if (next && remaining <= threshold) {
			setLoading(true)
			next()
		}
	}

	useEffect(() => {
		if (offset) {
			if (horizontal) ref.current.scrollLeft += ref.current.scrollWidth - offset
			else ref.current.scrollTop += ref.current.scrollHeight - offset

			setOffset(0)
		}

		setLoading(false)
	}, [children])


	useEffect(() => initial && initial(), []) // optional initial load
	useMount(handleScroll) // Check for missing data after mount
	return (
		<div ref={ref}
			 onScroll={handleScroll}
			 onMouseDown={() => horizontal && setDragging(true)}
			 onMouseUp={() => setDragging(false)}
			 onMouseLeave={() => setDragging(false)}
			 {...props}
		>
			{ children }
		</div>
	)
}

export default memo(Infinite)
