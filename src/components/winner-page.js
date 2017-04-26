import React, { Component, PropTypes } from 'react'
import fireworks from 'fireworks'
import { getRandom } from '../util/common'

class WinnerPage extends Component {
	static propTypes = {
		img: PropTypes.string.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}
	componentDidMount() {
		setInterval(() => {
			fireworks({
				x: window.innerWidth / getRandom(0.1, 5),
				y: window.innerHeight / getRandom(0.1, 5),
				colors: ['#cc3333', '#4CAF50', '#81C784'],
			})
		}, 1000)
	}
	render() {
		const { img, width, height } = this.props
		return (
			<section className="root">
				<h1>You win!</h1>
				<img
					src={img}
					width={width}
					height={height}
				/>
				<style jsx>{`
					.root {
						display: flex;
						flex-flow: column nowrap;
						align-items: center;
						justify-content: center;
						background-image: url();
						width: 100%;
						height: 100vh;
					}
					h1 {
						font-size: 72px;
						color: yellow;
					}
				`}</style>
			</section>
		)
	}
}

export default WinnerPage
