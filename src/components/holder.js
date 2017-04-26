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
		storeState: PropTypes.object,
		unplace: PropTypes.func,
	}
	handleRemove = item => {
		this.props.unplace(this.props.storeState, item.pieceID)
	}
	render() {
		const {
			pieces = [],
			isOver,
			connectDropTarget,
		} = this.props
		return connectDropTarget(
			<section className={combineClasses('root', isOver && 'drop-hover')}>
				<div className="flex">
					{pieces.map((data, key) =>
						<Piece
							key={key}
							from="holder"
							onDrop={this.handleRemove}
							{...data}
						/>
					)}
				</div>
				<style jsx>{`
					.root {
						height: 100%;
					}
					.flex {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
					}
					.root :global(figure) {
						margin: .5rem;
					}
					.root::after {
						content: "";
						opacity: 0.7;
						background-color: white;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						position: fixed;
						z-index: -1;
						transition: all .2s;
					}
					.drop-hover::after {
						opacity: .4;
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
