import React from 'react';
import './MainPage.css'
import MainLayout from '../../layouts/MainLayout';
import BestStreaming from "./BestStreaming"; // MainLayout 컴포넌트를 임포트합니다.

const MainPage: React.FC = () => {
    return (
        <MainLayout>
            <div id="main-container">
                <BestStreaming />
            </div>
        </MainLayout>
    );
};

export default MainPage;
