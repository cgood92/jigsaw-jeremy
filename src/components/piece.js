import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { combineClasses } from '../util/common'
import { getPlacedOrder } from '../redux/selectors'
import { placePiece } from '../redux/placed'

class Piece extends React.Component {
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		id: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
		placeOrder: PropTypes.number,
		place: PropTypes.func,
	}
	getStyle = () => {
		const {
			x,
			y,
			img,
			width,
			height,
			placeOrder,
		} = this.props

		let style = {
			backgroundImage: `url(${img})`,
			backgroundPosition: `-${x}px -${y}px`,
		}

		if (placeOrder === undefined) {
			style = {
				...style,
				position: 'absolute',
				width,
				height,
			}
		} else {
			style = {
				...style,
				order: placeOrder,
			}
		}

		return style
	}
	handleClick = () => {
		this.props.place(this.props.id)
	}
	render() {
		const {
			id,
			placeOrder,
		} = this.props
		return (
			<figure
				style={this.getStyle()}
				className={combineClasses(placeOrder === undefined && 'loose')}
				onClick={this.handleClick}
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

					figure.loose {
						position: absolute;
						right: 0;
						top: 0;
					}
				`}</style>
			</figure>
		)
	}
}

const mapStateToProps = (state, { id }) => ({
	placeOrder: getPlacedOrder(state, id),
})

const mapDispatchToProps = dispatch => ({
	place(pieceID) {
		dispatch(placePiece(pieceID))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Piece)
