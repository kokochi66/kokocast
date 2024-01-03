import React from 'react';
import './BestStreaming.css'; // 별도의 CSS 파일

const LiveStreamRanking: React.FC = () => {
    return (
        <div className="best-streaming-container">
            <div className="video-container">
                {/* 임시 이미지. 나중에 동영상으로 대체 */}
                <img src="https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26441748/live/4161643/record/24231362/thumbnail/image_480.jpg" alt="Live Stream" className="stream-video" />
            </div>
            <div className="stream-info">
                <div className="top-info">
                    <h2>실시간 시청자 수 1위</h2>
                    <p>1,202명이 시청중</p>
                </div>
                <div className="streamer-info">
                    <img src="https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTk0/MDAxNzAyOTU5NTUzNzYx.HI2Ow6d8GfIKBBaGMNYXrd09WSvkNyQS6Ayaikxsdlsg.WS5q6-wqM6V5GhVFSC_VYhM3Z4myzOSObNzn0GHMKZcg.PNG/%EA%B0%90%EB%B8%94%EB%9F%AC%EB%8B%98_%EB%82%B4%EB%A7%9E%EB%B0%B8.png?type=f120_120_na" alt="Streamer Profile" className="streamer-profile" />
                    <div className="streamer-details">
                        <h3>감블러</h3>
                        <p>로스트아크 플레이 중</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveStreamRanking;
