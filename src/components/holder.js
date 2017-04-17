import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { combineClasses } from '../util/common'
import { getUnplacedPieces, getPiece } from '../redux/selectors'
import { unplacePiece } from '../redux/unplaced'

import Piece from './piece'

class Holder extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool,
	}
	render() {
		const {
			pieces = [],
			isOver,
			connectDropTarget,
		} = this.props
		return connectDropTarget(
			<section className={combineClasses('root', isOver && 'drop-hover')}>
				{pieces.map((data, key) =>
					<Piece
						key={key}
						from="holder"
						{...data}
					/>
				)}
				<style jsx>{`
					.root {
						display: flex;
						flex-wrap: wrap;
						margin-left: auto;
						width: 100%;
						height: 100%;
						transition: all .2s;
					}
					.root :global(figure) {
						margin: .5rem;
					}
					.drop-hover {
						background-color: blue;
					}
				`}</style>
			</section>
		)
	}
}

const pieceTarget = {
	drop(props, monitor) {
		const item = monitor.getItem()
		props.unplace(props.storeState, item.pieceID)
	},
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
	}
}

const withDrag = DropTarget('piece', pieceTarget, collect)(Holder)

const mapStateToProps = state => ({
	pieces: getUnplacedPieces(state),
	storeState: state,
})

const mapDispatchToProps = dispatch => ({
	unplace: (storeState, pieceID) => dispatch(unplacePiece(getPiece(storeState, pieceID))),
})

export default connect(mapStateToProps, mapDispatchToProps)(withDrag)
