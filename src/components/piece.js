import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

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
		connectDragSource: PropTypes.func.isRequired,
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

const pieceSource = {
	canDrag(props) {
    // You can disallow drag based on props
		// return props.isReady
		return true
	},

	isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
		return monitor.getItem().id === props.pieceID
	},

	beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
		return { pieceID: props.pieceID }
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
			return
		}

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
		const item = monitor.getItem()

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
		const dropResult = monitor.getDropResult()

    // This is a good place to call some Flux action
		// props.handleClick(item.pieceID)()
	},
}

const collect = (connect, monitor) => {
	return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
		connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
		isDragging: monitor.isDragging(),
	}
}

const PieceWithRedux = DragSource('piece', pieceSource, collect)(Piece)

const mapStateToProps = (state, { pieceID }) => ({
	order: getPlacedOrder(state, pieceID),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PieceWithRedux)
