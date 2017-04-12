import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// eslint-disable-next-line no-unused-vars
import reset from 'reset-css'

import App from './components/app'
import initStore from './store'

render(
	<Provider store={initStore()}>
		<App/>
	</Provider>
	, document.getElementById('app'))
