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
		switchPiece: PropTypes.func,
	}
	render() {
		const {
			pieces = [],
			width,
			height,
			rows,
			cols,
			switchPiece,
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
				{pieces.map((data, key) => <Piece key={key} switchPiece={switchPiece} {...data}/>)}
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
	unplace: storeState => pieceID => dispatch(unplacePiece(getPiece(storeState, pieceID))),
	place: (storeState, blankID) => pieceID => dispatch(placePiece(getPiece(storeState, pieceID), blankID)),
	switchPiece: (sourceID, destID) => dispatch(switchPieceRedux(sourceID, destID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
