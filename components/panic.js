import React from 'react'

export default class Panic extends React.Component {
	constructor(props) {
		super(props)

		this.state = { panicked: false }
	  }

	static getDerivedStateFromError(error) {
		return { panicked: true, error }
	}

	componentDidCatch(error, info) {
		if (this.props.onCatch)
			this.props.onCatch(error, info)
	}

	render() {
		return this.state.panicked
			? this.props.fallback
			: this.props.children
	}
}
