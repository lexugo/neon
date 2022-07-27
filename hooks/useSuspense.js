import { useContext, createContext, useCallback, useState } from 'react'

import { Suspenseful } from '../contexts'

export default function useSuspense() {
	return useContext(Suspenseful)
}
