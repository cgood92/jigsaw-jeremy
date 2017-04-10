import { UNPLACE_PIECE } from './unplaced'

export const PLACE_PIECE = 'react-puzzle/placed/PLACE_PIECE'

const INITIAL_STATE = {}

export default function reducer(state = INITIAL_STATE, action = {}) {
	const { type, data } = action
	switch (type) {
		case PLACE_PIECE: {
			const order = Object.keys(state).length
			return {
				...state,
				[data.pieceID]: {
					...data,
					order,
				},
			}
		}
		case UNPLACE_PIECE: {
			const { [String(data.pieceID)]: target, ...rest } = state
			return rest
		}
		default:
			return state
	}
}

export const placePiece = data => ({ type: PLACE_PIECE, data })
