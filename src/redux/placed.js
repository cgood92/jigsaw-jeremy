import { UNPLACE_PIECE } from './unplaced'

export const PLACE_PIECE = 'react-puzzle/placed/PLACE_PIECE'

const INITIAL_STATE = {}

export default function reducer(state = INITIAL_STATE, action = {}) {
	const { type, data } = action
	switch (type) {
		case PLACE_PIECE:
			return {
				...state,
				[data.pieceID]: {
					...data,
					order: data.blankID,
				},
			}
		case UNPLACE_PIECE: {
			const { [String(data.pieceID)]: target, ...rest } = state
			return rest
		}
		default:
			return state
	}
}

export const placePiece = (piece, blankID) => ({ type: PLACE_PIECE, data: { ...piece, blankID } })
