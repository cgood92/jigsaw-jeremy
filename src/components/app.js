import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createPiece } from '../redux/unplaced'
import Board from './board'
import Holder from './holder'

class App extends React.Component {
	static propTypes = {
		rows: PropTypes.number.isRequired,
		cols: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
		_createPiece: PropTypes.func,
	}
	constructor(props) {
		super(props)
		this.generatePieces()
	}
	generatePieces = () => {
		const { rows, cols, width, height, img } = this.props
		const colWidth = width / cols
		const rowHeight = height / rows
		return 'r'
			.repeat(cols)
			.split('')
			.map((_r, r) =>
				'c'
					.repeat(rows)
					.split('')
					.map((_c, c) =>
						this.props._createPiece({
							img,
							x: colWidth * c,
							y: rowHeight * r,
							width: colWidth,
							height: rowHeight,
							pieceID: (r * rows) + c + 1,
						})
					)
			)
	}
	render() {
		return (
			<main>
				<Board
					img="https://pbs.twimg.com/profile_images/3560120116/4f71587922c2b76312e71e0512e9c0f5_400x400.png"
					height={400}
					width={400}
					rows={3}
					cols={3}
				/>
				<Holder
					img="https://pbs.twimg.com/profile_images/3560120116/4f71587922c2b76312e71e0512e9c0f5_400x400.png"
					height={400}
					width={400}
					rows={3}
					cols={3}
				/>
				<style jsx>{`
				`}</style>
			</main>
		)
	}
}

const mapStateToProps = () => ({
	img: 'https://pbs.twimg.com/profile_images/3560120116/4f71587922c2b76312e71e0512e9c0f5_400x400.png',
	height: 400,
	width: 400,
	rows: 3,
	cols: 3,
})

const mapDispatchToProps = dispatch => ({
	_createPiece(data) {
		dispatch(createPiece(data))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
