import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { combineClasses } from '../util/common'

class Blank extends React.Component {
	static propTypes = {
		order: PropTypes.number,
		isOver: PropTypes.bool,
		connectDropTarget: PropTypes.func.isRequired,
	}
	render() {
		const {
			order,
			isOver,
			connectDropTarget,
		} = this.props
		return connectDropTarget(
			<div
				className={combineClasses('root', isOver && 'targeted')}
				style={{
					order,
				}}
			>
				<style jsx>{`
					.root {
						height: 100%;
						width: 100%;
						background-color: lightgray;
						border: 1px solid black;
						transition: background-color .5s;
					}
					.root.targeted {
						background-color: lightgreen;
						border: 3px solid black;
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
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver({ shallow: true }),
	}
}

export default DropTarget('piece', pieceTarget, collect)(Blank)
