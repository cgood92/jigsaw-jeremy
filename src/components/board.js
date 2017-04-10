import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPlacedPieces, getPiece } from '../redux/selectors'
import { unplacePiece } from '../redux/unplaced'

import Piece from './piece'

class Board extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
		unplace: PropTypes.func,
		storeState: PropTypes.object,
	}
	onClick = pieceID => () => {
		const {
			unplace,
			storeState,
		} = this.props
		unplace(storeState, pieceID)
	}
	render() {
		const { pieces = [] } = this.props
		return (
			<section className="root">
				{pieces.map((data, key) =>
					<Piece
						key={key}
						handleClick={this.onClick}
						{...data}
					/>
				)}
				<style jsx>{`
					.root {
						display: grid;
						grid-template: repeat(3, calc(100%/3)) / repeat(3, calc(100%/3));
						width: 400px;
						height: 400px;
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