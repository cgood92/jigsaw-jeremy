import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUnplacedPieces, getPiece } from '../redux/selectors'
import { placePiece } from '../redux/placed'

import Piece from './piece'

class Holder extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
		place: PropTypes.func,
		storeState: PropTypes.object,
	}
	onClick = pieceID => () => {
		const {
			place,
			storeState,
		} = this.props
		place(storeState, pieceID)
	}
	render() {
		const { pieces = [] } = this.props
		return (
			<section className="root">
				{pieces.map((data, key) =>
					<Piece
						handleClick={this.onClick}
						key={key}
						{...data}
					/>
				)}
				<style jsx>{`
					.root {
						display: flex;
						flex-wrap: wrap;
					}
				`}</style>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	pieces: getUnplacedPieces(state),
	storeState: state,
})

const mapDispatchToProps = dispatch => ({
	place(storeState, pieceID) {
		dispatch(placePiece(getPiece(storeState, pieceID)))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Holder)
