import Panic from './panic'
import Suspense from './suspense'

export default function Safe({ children, fallback }) {
	return (
		<Panic fallback={fallback}>
			<Suspense fallback={fallback}>
				{ children }
			</Suspense>
		</Panic>
	)
}
