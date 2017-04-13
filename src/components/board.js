import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPlacedPieces, getPiece } from '../redux/selectors'
import { unplacePiece } from '../redux/unplaced'

import Piece from './piece'
import Blank from './blank'

class Board extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
		unplace: PropTypes.func,
		storeState: PropTypes.object,
		width: PropTypes.number,
		height: PropTypes.number,
		rows: PropTypes.number,
		cols: PropTypes.number,
	}
	onClick = pieceID => () => {
		const {
			unplace,
			storeState,
		} = this.props
		unplace(storeState, pieceID)
	}
	generateBlanks = () => {
		const {
			pieces,
			width,
			height,
			rows,
			cols,
		} = this.props
		const blanksNeeded = (rows * cols) - pieces.length
		return 'b'
			.repeat(blanksNeeded)
			.split('')
			.map((b, i) =>
				<Blank
					key={i}
					width={width / cols}
					height={height / rows}
				/>
			)
	}
	render() {
		const {
			pieces = [],
			width,
			height,
			rows,
			cols,
		} = this.props
		const blanks = this.generateBlanks()
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
						handleClick={this.onClick}
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
	unplace(storeState, pieceID) {
		dispatch(unplacePiece(getPiece(storeState, pieceID)))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
