import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import { combineClasses } from '../util/common'
import { getPlacedOrder } from '../redux/selectors'

class Piece extends React.Component {
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
		order: PropTypes.number,
		connectDragSource: PropTypes.func.isRequired,
	}
	render() {
		const {
			img,
			x,
			y,
			width,
			height,
			order,
			connectDragSource,
		} = this.props
		return connectDragSource(
			<figure
				style={{
					width,
					height,
					order,
					backgroundImage: `url(${img})`,
					backgroundPosition: `-${x}px -${y}px`,
				}}
				className={combineClasses(order === undefined && 'loose')}
			>
				<style jsx>{`
					figure {
						width: 100%;
						height: 100%;
						overflow: hidden;
						border: 1px solid black;
					}
				`}</style>
			</figure>
		)
	}
}

const pieceSource = {
	beginDrag(props) {
		return { pieceID: props.pieceID }
	},
}

const collect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

const PieceWithRedux = DragSource('piece', pieceSource, collect)(Piece)

const mapStateToProps = (state, { pieceID }) => ({
	order: getPlacedOrder(state, pieceID),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PieceWithRedux)
