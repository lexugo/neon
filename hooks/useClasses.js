import { useMemo } from 'react'

function join(classes) {
	return classes
		.filter(className => className) // Hide empty strings
		.join(' ')
}

export default function useClasses(...classes) {
	return useMemo(() => join(classes), classes)
}
