import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './app/App.tsx';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  root.className = 'flex flex-col min-w-full max-w-[1440px] min-h-screen my-0 mx-auto text-center';
}
