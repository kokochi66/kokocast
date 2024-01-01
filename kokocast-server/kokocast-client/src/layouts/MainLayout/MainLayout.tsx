import React, {ReactNode} from 'react';
import Sidebar from '../../components/Sidebar';

interface MainLayoutProps {
    children: ReactNode; // ReactNode 타입으로 children을 정의합니다.
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar /> {/* 사이드바 컴포넌트 */}
                <div className="col-md-9">
                    {children} {/* 메인 콘텐츠가 렌더링되는 부분 */}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
