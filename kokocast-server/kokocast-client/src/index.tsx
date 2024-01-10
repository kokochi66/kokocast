// @ts-ignore
import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import { App } from './App'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./context/Auth";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // 루트 생성
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();
