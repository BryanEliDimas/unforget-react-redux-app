import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import remindersReducer from './reducers'
import './index.css'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(remindersReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
)

registerServiceWorker();
