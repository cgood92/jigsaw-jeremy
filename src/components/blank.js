import React, { PropTypes } from 'react'

class Blank extends React.Component {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
	}
	render() {
		const { width, height } = this.props
		return (
			<div
				className="root"
				style={{
					width: `${width}px`,
					height: `${height}px`,
				}}
			>
				<style jsx>{`
					.root {
						order: 100;
						background-color: lightgray;
						border: 1px solid black;
					}
				`}</style>
			</div>
		)
	}
}

export default Blank
