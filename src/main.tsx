import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store/store.ts';
import { Provider } from 'react-redux';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
