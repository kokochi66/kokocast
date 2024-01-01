import React from 'react';
import MainLayout from '../../layouts/MainLayout'; // MainLayout 컴포넌트를 임포트합니다.

const MainPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="main-content">
                <h1>메인 페이지</h1>
                {/*<p>여기에 메인 페이지의 콘텐츠가 들어갑니다.</p>*/}
                {/* 추가 콘텐츠와 컴포넌트가 이곳에 위치할 수 있습니다. */}
            </div>
        </MainLayout>
    );
};

export default MainPage;
