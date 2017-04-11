export const SET_IMAGE = 'react-puzzle/game/SET_IMAGE'
export const SET_GRID = 'react-puzzle/game/SET_GRID'

const INITIAL_STATE = {
	img: '',
	height: 0,
	width: 0,
	rows: 0,
	cols: 0,
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
		default:
			return state
	}
}

export const setImage = data => ({ type: SET_IMAGE, data })
export const setGrid = data => ({ type: SET_GRID, data })
