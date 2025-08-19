'use client';

import React from 'react';
import { Provider } from 'react-redux';

import dynamic from 'next/dynamic';

import store from '@/shared/store';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
