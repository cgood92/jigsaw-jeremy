import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { parse as qs } from 'query-string'
import { createPiece } from '../redux/unplaced'
import { setImage, setGrid } from '../redux/game'
import { getImage, getDimensions, getGrid, isGameDone } from '../redux/selectors'
import { generatePieces } from '../init-game'
import jeremy from '../static/jeremy.jpg'
import Layout from './layout'
import WinnerPage from './winner-page'

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
		isGameDone: PropTypes.bool,
	}
	constructor(props) {
		super(props)
		this.setGame()
	}
	setGame = () => {
		const {
			rows = 5,
			cols = 5,
			img = jeremy,
			height = 637,
			width = 857,
		} = qs(window.location.search)
		// Hardcoding this for now
		this.props.setImage({
			img,
			height,
			width,
		})
		this.props.setGrid({
			rows,
			cols,
		})
	}
	componentWillReceiveProps(next) {
		const { img, rows, cols, width, height, isGameDone } = next
		if (img && rows && cols && width && height && !isGameDone) {
			generatePieces({ rows, cols, width, height, img }, this.props.createPiece)
		}
	}
	render() {
		const { img, height, width, rows, cols, isGameDone } = this.props
		if (isGameDone) {
			return (
				<WinnerPage
					img={img}
					height={height}
					width={width}
				/>
			)
		}
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
	isGameDone: isGameDone(state),
})

const mapDispatchToProps = {
	createPiece,
	setImage,
	setGrid,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
