import React, { PropTypes } from 'react'
import Piece from './piece'

export default class Board extends React.Component {
	static propTypes = {
		rows: PropTypes.number.isRequired,
		cols: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		img: PropTypes.string.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {}
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
						<Piece
							key={r + '_' + c}
							img={img}
							x={colWidth * c}
							y={rowHeight * r}
							width={colWidth}
							height={rowHeight}
							id={(r * rows) + c + 1}
						/>
						)
			)
	}
	render() {
		const pieces = this.generatePieces()
		return (
			<section className="root">
				{pieces}
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
