import ReactDOM from 'react-dom/client'
import './index.css'
import App from "@/App.jsx"
import { persistor, store } from '../store/configSaga.js';

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history"
import { HistoryRouter } from './HistoryRouter.jsx';
import { Toaster } from './components/ui/toaster.js';

export const history = createBrowserHistory()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <HistoryRouter history={history}>
        <Toaster />
        <App />
      </HistoryRouter>
    </PersistGate>
  </Provider >
)
