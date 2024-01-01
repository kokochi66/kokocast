import React from 'react';
import ChannelCard from './ChannelCard'; // 이후에 만들 컴포넌트입니다
import './Sidebar.css';

const Sidebar: React.FC = () => {
    // 채널 정보를 갖는 리스트
    const channelList = [
        {
            broadcasterName: "감블러",
            gamePlaying: "마인크래프트",
            viewerCount: 2173,
            profileImageUrl: "https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTk0/MDAxNzAyOTU5NTUzNzYx.HI2Ow6d8GfIKBBaGMNYXrd09WSvkNyQS6Ayaikxsdlsg.WS5q6-wqM6V5GhVFSC_VYhM3Z4myzOSObNzn0GHMKZcg.PNG/%EA%B0%90%EB%B8%94%EB%9F%AC%EB%8B%98_%EB%82%B4%EB%A7%9E%EB%B0%B8.png?type=f120_120_na"
        },
        {
            broadcasterName: "시라유키 히나 g히머시기ㅁㄴㅇㅁㄴㅇㅁㄴㅇ",
            gamePlaying: "마인크래프트asdasdasdadㅁㄴㅇㅁㅇㅁㄴㅇㅁㄴㅇ",
            viewerCount: 4321,
            profileImageUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/68deba95-cc66-4af8-ac4b-7b038ca0427d-profile_image-70x70.png"
        },
        {
            broadcasterName: "김남봉",
            gamePlaying: "Just Chatting",
            viewerCount: 671,
            profileImageUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/b36eff51-f34f-40d7-b613-7b7b4f9193ea-profile_image-70x70.png"
        },
        {
            broadcasterName: "던",
            gamePlaying: "하스스톤",
            viewerCount: 408,
            profileImageUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/f74aa625-56bb-46d0-b590-ac165695825f-profile_image-70x70.png"
        },
        {
            broadcasterName: "네네코 마시로",
            gamePlaying: "마인크래프트",
            viewerCount: 4391,
            profileImageUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/99903ff6-40c3-489c-b449-f8e338c716da-profile_image-70x70.png"
        },
        {
            broadcasterName: "플레임",
            gamePlaying: "Just Chatting",
            viewerCount: 1497,
            profileImageUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/c5c416f5-9e95-4d72-b1dc-54d15e8b1657-profile_image-70x70.png"
        },
    ];


    return (
        <div id="sidebar" className="sidebar col-md-3 d-flex flex-column">
            <h2 id="sidebar-title" className="text-center mb-3">Kokocast</h2>
            <div className="followed-channels">
                <h5 className="mb-2 channel-title">팔로우 채널</h5> {/* 섹션 제목 */}
                {channelList.map((channel, index) => (
                    <ChannelCard
                        key={index}
                        broadcasterName={channel.broadcasterName}
                        gamePlaying={channel.gamePlaying}
                        viewerCount={channel.viewerCount}
                        profileImageUrl={channel.profileImageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
