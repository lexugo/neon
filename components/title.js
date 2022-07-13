import Head from 'next/head'

export default function Title({ children }) {
	return (
		<h1>
			<Head>
				<title>Presense · { children }</title>
			</Head>
			{ children }
		</h1>
	)
}
