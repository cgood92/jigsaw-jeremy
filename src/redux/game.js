import { PLACE_PIECE } from './placed'

export const SET_IMAGE = 'react-puzzle/game/SET_IMAGE'
export const SET_GRID = 'react-puzzle/game/SET_GRID'
export const WIN_GAME = 'react-puzzle/game/WIN_GAME'

const INITIAL_STATE = {
	img: '',
	height: 0,
	width: 0,
	rows: 0,
	cols: 0,
	solved: false,
}

export default function reducer(state = INITIAL_STATE, action = {}) {
	const { type, data } = action
	switch (type) {
		case SET_IMAGE:
			return {
				...state,
				img: data.img,
				height: data.height,
				width: data.width,
			}
		case SET_GRID:
			return {
				...state,
				rows: data.rows,
				cols: data.cols,
			}
		case WIN_GAME:
			return {
				...state,
				solved: true,
			}
		default:
			return state
	}
}

export const setImage = data => ({ type: SET_IMAGE, data })
export const setGrid = data => ({ type: SET_GRID, data })
export const winGame = () => ({ type: WIN_GAME })

// Middlewares
export const checkGameCompletion = ({ getState, dispatch }) => next => action => {
	const state = next(action)
	if (action.type === PLACE_PIECE) {
		if (
			Object.keys(getState().unplaced).length === 0 &&
			Object.keys(getState().placed)
				.every(({ pieceID, order }) =>
					order === pieceID
				)
		) {
			dispatch(winGame())
		}
	}
	return state
}
