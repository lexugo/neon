import { useCallback } from 'react'

export default function useValidate([value, set], validate) {
	return [
		value,
		useCallback(value => validate(value) && set(value), [])
	]
}
