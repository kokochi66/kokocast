import React from 'react';
import './BestStreaming.css'; // 별도의 CSS 파일

const LiveStreamRanking: React.FC = () => {
    return (
        <div className="best-streaming-container">
            <div className="video-container">
                {/* 임시 이미지. 나중에 동영상으로 대체 */}
                <img src="https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26494320/live/4163356/record/24242826/thumbnail/image_1080.jpg" alt="Live Stream" className="stream-video" />
            </div>
            <div className="stream-info">
                <div className="top-info">
                    <h2>실시간 시청자 수 1위</h2>
                    <p>1,202명이 시청중</p>
                </div>
                <div className="streamer-info">
                    <img src="https://nng-phinf.pstatic.net/MjAyMzEyMjJfMjg0/MDAxNzAzMjQyNTE3MDk5.CuBTzC4M3BeLP9NYEY-p1rYTxW3qfyhTL_zNHI6qaUYg.ohdthdl_5mMiiLo29KGJ_rimQSVm1DNO8Z2dhuhtyugg.PNG/4CBB95E5-2793-46B3-A7D1-F2DD167452CA.png?type=f120_120_na" alt="Streamer Profile" className="streamer-profile" />
                    <div className="streamer-details">
                        <h3>이춘향</h3>
                        <p>발로란트 플레이 중</p>
                    </div>
                </div>
            </div>
            <div className="stream-info-bg"></div>
        </div>
    );
};

export default LiveStreamRanking;
