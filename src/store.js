import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import placed from './redux/placed'
import unplaced from './redux/unplaced'

export const rootReducer = combineReducers({
	placed,
	unplaced,
})

const initStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeWithDevTools()
	)

export default initStore
