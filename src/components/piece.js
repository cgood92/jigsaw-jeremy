import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { combineClasses } from '../util/common'
import { getPlacedOrder } from '../redux/selectors'

class Piece extends React.Component {
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		pieceID: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
		order: PropTypes.number,
		handleClick: PropTypes.func,
	}
	render() {
		const {
			pieceID,
			img,
			x,
			y,
			width,
			height,
			order,
			handleClick,
		} = this.props
		return (
			<figure
				style={{
					width,
					height,
					order,
					backgroundImage: `url(${img})`,
					backgroundPosition: `-${x}px -${y}px`,
				}}
				className={combineClasses(order === undefined && 'loose')}
				onClick={handleClick(pieceID)}
			>
				<h1>{pieceID}</h1>
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

const mapStateToProps = (state, { pieceID }) => ({
	order: getPlacedOrder(state, pieceID),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Piece)
