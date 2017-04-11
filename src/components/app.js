import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createPiece } from '../redux/unplaced'
import { setImage, setGrid } from '../redux/game'
import { getImage, getDimensions, getGrid } from '../redux/selectors'
import Layout from './layout'

class App extends React.Component {
	static propTypes = {
		rows: PropTypes.number.isRequired,
		cols: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
		createPiece: PropTypes.func,
		setGrid: PropTypes.func,
		setImage: PropTypes.func,
	}
	constructor(props) {
		super(props)
		this.setGame()
	}
	generatePieces = ({ rows, cols, width, height, img }) => {
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
						this.props.createPiece({
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
	setGame = () => {
		this.props.setImage({
			img: 'https://pbs.twimg.com/profile_images/3560120116/4f71587922c2b76312e71e0512e9c0f5_400x400.png',
			height: 400,
			width: 400,
		})
		this.props.setGrid({
			rows: 3,
			cols: 3,
		})
	}
	componentWillReceiveProps(next) {
		const { img, rows, cols, width, height } = next
		if (img && rows && cols && width && height) {
			this.generatePieces({ rows, cols, width, height, img })
		}
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

const mapDispatchToProps = {
	createPiece,
	setImage,
	setGrid,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
