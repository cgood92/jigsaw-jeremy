export const SET_IMAGE = 'react-puzzle/game/SET_IMAGE'
export const SET_GRID = 'react-puzzle/game/SET_GRID'

const INITIAL_STATE = {
	img: 'https://pbs.twimg.com/profile_images/3560120116/4f71587922c2b76312e71e0512e9c0f5_400x400.png',
	height: 400,
	width: 400,
	rows: 3,
	cols: 3,
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
