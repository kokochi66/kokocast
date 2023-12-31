// @ts-ignore
import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import { App } from './App'
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // 루트 생성
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

reportWebVitals();
