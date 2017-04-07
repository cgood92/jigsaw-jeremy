import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app'
import initStore from './store'

render(
	<Provider store={initStore()}>
		<App/>
	</Provider>
	, document.getElementById('app'))
