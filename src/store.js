import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import placed from './redux/placed'
import unplaced from './redux/unplaced'
import game, { checkGameCompletion } from './redux/game'

export const rootReducer = combineReducers({
	game,
	placed,
	unplaced,
})

const initStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(checkGameCompletion))
	)

export default initStore
