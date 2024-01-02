import React from 'react';
import './MoreButton.css'; // CSS 파일의 경로는 실제 위치에 맞게 조정하세요

interface MoreButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}


const MoreButton: React.FC<MoreButtonProps> = ({ onClick }) => (
    <div className="d-flex justify-content-center more-button mt-3">
        <button className="custom-load-more-button btn" onClick={onClick}>
            더보기
        </button>
    </div>
);

export default MoreButton;
