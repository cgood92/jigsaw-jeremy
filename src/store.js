import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import placed from './redux/placed'

export const rootReducer = combineReducers({
	placed,
})

const initStore = initialState =>
	createStore(
		rootReducer,
		initialState,
		composeWithDevTools()
	)

export default initStore
