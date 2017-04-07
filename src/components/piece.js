import React, { PropTypes } from 'react'

export default class Piece extends React.Component {
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
	}
	render() {
		const {
			x,
			y,
			id,
			img,
		} = this.props
		return (
			<figure
				style={{
					backgroundImage: `url(${img})`,
					backgroundPosition: `-${x}px -${y}px`,
				}}
			>
				<h1>{id}</h1>
				<style jsx>{`
					figure {
						width: 100%;
						height: 100%;
						overflow: hidden;
						display: flex;
						justify-content: center;
						align-items: center;
						border: 1px solid black;
					}
				`}</style>
			</figure>
		)
	}
}
