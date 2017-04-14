import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUnplacedPieces } from '../redux/selectors'

import Piece from './piece'

class Holder extends React.Component {
	static propTypes = {
		pieces: PropTypes.array,
	}
	render() {
		const { pieces = [] } = this.props
		return (
			<section className="root">
				{pieces.map((data, key) => <Piece key={key} {...data}/>)}
				<style jsx>{`
					.root {
						display: flex;
						flex-wrap: wrap;
						margin-right: -4rem;
					}
					.root :global(figure) {
						margin: 4rem 0 4rem 4rem;
					}
				`}</style>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	pieces: getUnplacedPieces(state),
})

export default connect(mapStateToProps)(Holder)
