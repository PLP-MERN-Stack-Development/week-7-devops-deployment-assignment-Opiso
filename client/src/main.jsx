import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux';
import App from './App.jsx'
// import reportwebvitals from './reportwebvitals'
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
