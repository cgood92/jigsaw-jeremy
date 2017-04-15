import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getPlacedPieces, getPiece } from '../redux/selectors'
import { unplacePiece } from '../redux/unplaced'
import { placePiece, switchPiece as switchPieceRedux } from '../redux/placed'

import { generateBlanks } from '../init-game'

import Piece from './piece'
import Blank from './blank'

class Board extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
		width: PropTypes.number,
		height: PropTypes.number,
		rows: PropTypes.number,
		cols: PropTypes.number,
		storeState: PropTypes.object,
		switchPiece: PropTypes.func,
		switchPieceOffBoard: PropTypes.func,
	}
	handleDrop = (item, target) => {
		if (item.from === 'board') {
			this.props.switchPiece(item.pieceID, target.pieceID)
		} else if (item.from === 'holder') {
			const state = this.props.storeState
			this.props.switchPieceOffBoard(state, item.pieceID, getPiece(state, target.pieceID).order, target.pieceID)
		}
	}
	render() {
		const {
			pieces = [],
			width,
			height,
			rows,
			cols,
		} = this.props
		const blanks = generateBlanks(this.props).map((info, key) => <Blank key={key} {...info}/>)
		return (
			<section
				className="root"
				style={{
					width: `${width}px`,
					height: `${height}px`,
					gridTemplate: `repeat(${rows}, calc(100%/${rows})) / repeat(${cols}, calc(100%/${cols}))`,
				}}
			>
				{pieces.map((data, key) =>
					<Piece
						key={key}
						onDrop={this.handleDrop}
						from="board"
						{...data}
					/>
				)}
				{blanks}
				<style jsx>{`
					.root {
						display: grid;
					}
				`}</style>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	pieces: getPlacedPieces(state),
	storeState: state,
})

const mapDispatchToProps = dispatch => ({
	place: (storeState, blankID) => pieceID => dispatch(placePiece(getPiece(storeState, pieceID), blankID)),
	switchPiece: (sourceID, destID) => dispatch(switchPieceRedux(sourceID, destID)),
	switchPieceOffBoard: (storeState, sourceID, sourceOrder, destID) => {
		dispatch(unplacePiece(getPiece(storeState, destID)))
		dispatch(placePiece(getPiece(storeState, sourceID), sourceOrder))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
