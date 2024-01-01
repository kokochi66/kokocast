import React from 'react';
import './ChannelCard.css';


interface ChannelCardProps {
    broadcasterName: string;
    gamePlaying: string;
    viewerCount: number;
    profileImageUrl: string;
}

const ChannelCard: React.FC<ChannelCardProps> = (
    {
        broadcasterName,
        gamePlaying,
        viewerCount,
        profileImageUrl,
    }
) => {
    const formattedViewerCount = viewerCount.toLocaleString("en-US");

    return (
        <div className="channel-card d-flex mb-3">
            {/* 부트스트랩 클래스를 사용하여 스타일링 */}
            <div className="profile-pic rounded-circle">
                <img src={profileImageUrl} alt="Profile" className="h-100 w-100"/>
            </div>
            <div className="channel-info">
                <div className="broadcaster-name font-weight-bold">{broadcasterName}</div>
                <div className="game-playing">{gamePlaying}</div>
            </div>
            <div className="viewer-count ml-auto">
                <span className="live-indicator"/>
                {formattedViewerCount}
            </div>
        </div>
    );
};

export default ChannelCard;
