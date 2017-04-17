import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'

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
		isDragging: PropTypes.bool,
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
	}
	render() {
		const {
			img,
			x,
			y,
			width,
			height,
			order,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		return connectDragSource(connectDropTarget(
			<figure
				style={{
					width,
					height,
					order,
					backgroundImage: `url(${img})`,
					backgroundPosition: `-${x}px -${y}px`,
				}}
				className={combineClasses(order === undefined && 'loose', isDragging && 'dragging')}
			>
				<style jsx>{`
					figure {
						width: 100%;
						height: 100%;
						overflow: hidden;
						border: 1px solid black;
						cursor: -moz-grab;
						cursor: -webkit-grab;
						cursor: grab;
					}
				`}</style>
			</figure>
		))
	}
}

const pieceSource = {
	beginDrag(props) {
		return {
			pieceID: props.pieceID,
			from: props.from,
		}
	},
}

const sourceCollect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

const pieceTarget = {
	drop(props, monitor) {
		const item = monitor.getItem()
		props.onDrop(item, props)
	},
}

function targetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver({ shallow: true }),
	}
}

const PieceWithRedux = DropTarget('piece', pieceTarget, targetCollect)(DragSource('piece', pieceSource, sourceCollect)(Piece))

const mapStateToProps = (state, { pieceID }) => ({
	order: getPlacedOrder(state, pieceID),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PieceWithRedux)
