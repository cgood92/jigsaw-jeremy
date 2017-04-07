export const PLACE_PIECE = 'react-puzzle/pieces/PLACE_PIECE'

const INITIAL_STATE = {}

export default function reducer(state = INITIAL_STATE, action = {}) {
	const { type, data } = action
	switch (type) {
		case PLACE_PIECE: {
			const order = Object.keys(state).length
			return {
				...state,
				[data.pieceID]: order,
			}
		}
		default:
			return state
	}
}

export const placePiece = pieceID => ({ type: PLACE_PIECE, data: { pieceID } })
