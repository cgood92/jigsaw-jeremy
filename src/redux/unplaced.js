import { PLACE_PIECE } from './placed'

export const CREATE_PIECE = 'react-puzzle/unplaced/CREATE_PIECE'
export const UNPLACE_PIECE = 'react-puzzle/unplaced/UNPLACE_PIECE'

const INITIAL_STATE = {}

export default function reducer(state = INITIAL_STATE, action = {}) {
	const { type, data } = action
	switch (type) {
		case CREATE_PIECE:
			return {
				...state,
				[data.pieceID]: data,
			}
		case PLACE_PIECE: {
			const { [String(data.pieceID)]: target, ...rest } = state
			return rest
		}
		case UNPLACE_PIECE: {
			const order = Object.keys(state).length
			return {
				...state,
				[data.pieceID]: {
					...data,
					order,
				},
			}
		}
		default:
			return state
	}
}

export const createPiece = data => ({ type: CREATE_PIECE, data })
export const unplacePiece = data => ({ type: UNPLACE_PIECE, data })
