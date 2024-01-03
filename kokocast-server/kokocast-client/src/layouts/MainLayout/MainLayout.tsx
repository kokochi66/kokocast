import React, {ReactNode} from 'react';
import Sidebar from '../../components/Sidebar';
import './MainLayout.css';
import Header from "../../components/Header";

interface MainLayoutProps {
    children: ReactNode; // ReactNode 타입으로 children을 정의합니다.
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div id="main-layout" className="container-fluid">
            <div className="row">
                <Sidebar /> {/* 사이드바 컴포넌트 */}
                <Header />
                <div id="content" className="col-md-9">
                    {children} {/* 메인 콘텐츠가 렌더링되는 부분 */}
                </div>

            </div>
        </div>
    );
};

export default MainLayout;
