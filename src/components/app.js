import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createPiece } from '../redux/unplaced'
import { setImage, setGrid } from '../redux/game'
import { getImage, getDimensions, getGrid } from '../redux/selectors'
import { generatePieces } from '../init-game'
import jeremy from '../static/jeremy.jpg'
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
	setGame = () => {
		this.props.setImage({
			img: jeremy,
			height: 637,
			width: 857,
		})
		this.props.setGrid({
			rows: 5,
			cols: 3,
		})
	}
	componentWillReceiveProps(next) {
		const { img, rows, cols, width, height } = next
		if (img && rows && cols && width && height) {
			generatePieces({ rows, cols, width, height, img }, this.props.createPiece)
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
