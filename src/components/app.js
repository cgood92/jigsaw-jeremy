import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createPiece } from '../redux/unplaced'
import { getImage, getDimensions, getGrid } from '../redux/selectors'
import Layout from './layout'

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
		const { img, height, width, rows, cols } = this.props
		return (
			<Layout
				img={img}
				height={height}
				width={width}
				rows={rows}
				cols={cols}
			/>
		)
	}
}

const mapStateToProps = state => ({
	img: getImage(state),
	...getDimensions(state),
	...getGrid(state),
})

const mapDispatchToProps = dispatch => ({
	_createPiece(data) {
		dispatch(createPiece(data))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
