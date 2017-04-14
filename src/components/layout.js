import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './board'
import Holder from './holder'

const Layout = ({ img, height, width, cols, rows }) => (
	<main>
		<section className="holder">
			<Holder
				img={img}
			/>
		</section>
		<section className="board">
			<Board
				img={img}
				height={height}
				width={width}
				rows={rows}
				cols={cols}
			/>
		</section>
		<style jsx>{`
			main {
				display: flex;
				width: 100%;
				height: 100vh;
				justify-content: center;
			}
			.holder {
				width: 33%;
				background-color: lightblue;
				overflow: auto;
			}
			.board {
				width: 67%;
				background-color: lightgreen;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: auto;
			}
		`}</style>
	</main>
)

Layout.propTypes = {
	rows: PropTypes.number.isRequired,
	cols: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	img: PropTypes.string.isRequired,
}

export default DragDropContext(HTML5Backend)(Layout)
