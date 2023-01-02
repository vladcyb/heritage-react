import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import { store } from '@app/slices'

import App from './App'

import 'antd/dist/antd.css'
import './index.scss'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
