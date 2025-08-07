import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import './index.css';

import App from './App.tsx';
import store from './shared/store';

let root = document.getElementById('root');

if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

root.className = 'flex flex-col min-w-full max-w-[1440px] min-h-screen my-0 mx-auto text-center';
