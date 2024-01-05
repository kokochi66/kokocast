import React from 'react';
import './MainPage.css'
import MainLayout from '../../layouts/MainLayout';
import BestStreaming from "./BestStreaming";
import VideoArea from "./VideoArea"; // MainLayout 컴포넌트를 임포트합니다.

const MainPage: React.FC = () => {
    return (
        <MainLayout>
            <div id="main-container">
                <BestStreaming />
                <VideoArea title="팔로우 스트리머들의 인기클립" />
                <VideoArea title="팔로우 스트리머들의 다시보기" />
            </div>
        </MainLayout>
    );
};

export default MainPage;
