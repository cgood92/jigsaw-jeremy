import React, { PropTypes } from 'react'

export default class Piece extends React.Component {
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
	}
	render() {
		const {
			x,
			y,
			width,
			height,
			id,
			img,
		} = this.props
		return (
			<figure
				style={{
					width,
					height,
					top: y,
					left: x,
					backgroundImage: `url(${img})`,
					backgroundPosition: `-${x}px -${y}px`,
				}}
			>
				<h1>{id}</h1>
			</figure>
		)
	}
}
