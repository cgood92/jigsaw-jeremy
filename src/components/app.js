import React from 'react'
import Board from './board'

export default class App extends React.Component {
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
			</main>
		)
	}
}
