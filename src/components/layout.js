import React, { PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import flash from '../static/flash.jpg'
import jazz from '../static/jazz.jpg'
import Board from './board'
import Holder from './holder'

const Layout = ({ height, width, cols, rows }) => (
	<main>
		<section className="holder">
			<Holder/>
		</section>
		<section className="board">
			<Board
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
				overflow-x: hidden;
				overflow-y: auto;
				position: relative;
			}
			.holder::after {
				content: "";
				background-image: url(${jazz});
				background-size: cover;
				background-position: center center;
				/*opacity: 0.1;*/
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				position: absolute;
				z-index: -2;
			}
			.board {
				width: 67%;
				background-image: url(${flash});
				background-position: right bottom;
				background-repeat: no-repeat;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: auto;
			}
		`}</style>
		<style jsx global>{`
			* {
				box-sizing: border-box;
			}
		`}</style>
	</main>
)

Layout.propTypes = {
	rows: PropTypes.number.isRequired,
	cols: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
}

export default DragDropContext(HTML5Backend)(Layout)
