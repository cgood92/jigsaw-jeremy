import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { getUnplacedPieces, getPiece } from '../redux/selectors'
import { unplacePiece } from '../redux/unplaced'

import Piece from './piece'

class Holder extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
		connectDropTarget: PropTypes.func.isRequired,
	}
	render() {
		const { pieces = [], connectDropTarget } = this.props
		return connectDropTarget(
			<section className="root">
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
						margin-right: -4rem;
					}
					.root :global(figure) {
						margin: 4rem 0 4rem 4rem;
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
		isOver: monitor.isOver({ shallow: true }),
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
