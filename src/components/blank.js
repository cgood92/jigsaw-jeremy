import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

class Blank extends React.Component {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		order: PropTypes.number,
		connectDropTarget: PropTypes.func.isRequired,
	}
	render() {
		const {
			width,
			height,
			order,
			connectDropTarget,
		} = this.props
		return connectDropTarget(
			<div
				className="root"
				style={{
					order,
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

const pieceTarget = {
	drop(props, monitor) {
		const item = monitor.getItem()
		props.place(item.pieceID)
	},
}

function collect(connect, monitor) {
	return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
		connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		itemType: monitor.getItemType(),
	}
}

export default DropTarget('piece', pieceTarget, collect)(Blank)
