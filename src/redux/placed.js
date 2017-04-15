import { UNPLACE_PIECE } from './unplaced'

export const PLACE_PIECE = 'react-puzzle/placed/PLACE_PIECE'
export const SWITCH_PIECE = 'react-puzzle/placed/SWITCH_PIECE'

const INITIAL_STATE = {}

export default function reducer(state = INITIAL_STATE, action = {}) {
	const { type, data } = action
	switch (type) {
		case PLACE_PIECE:
			return {
				...state,
				[data.pieceID]: {
					...data,
					order: data.order,
				},
			}
		case UNPLACE_PIECE: {
			const { [String(data.pieceID)]: target, ...rest } = state
			return rest
		}
		case SWITCH_PIECE: {
			const _state = JSON.parse(JSON.stringify(state))
			const sourceOrder = state[data.sourceID].order
			_state[data.sourceID].order = _state[data.destID].order
			_state[data.destID].order = sourceOrder
			return _state
		}
		default:
			return state
	}
}

export const placePiece = (piece, order) => ({ type: PLACE_PIECE, data: { ...piece, order } })
export const switchPiece = (sourceID, destID) => ({ type: SWITCH_PIECE, data: { sourceID, destID } })
