import Link from 'next/link'

function Anchor({ href, children, ...props }) {
	return (
		<Link passHref shallow href={href}>
			<a {...props}>{ children }</a>
		</Link>
	)
}

export default Anchor
