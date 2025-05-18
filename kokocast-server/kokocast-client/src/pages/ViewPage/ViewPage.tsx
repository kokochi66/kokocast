import React from 'react';
import './ViewPage.css'
import MainLayout from "../../layouts/MainLayout";
import VideoStreamArea from "./VideoStreamArea";
import LiveChatArea from "./LiveChatArea";
import StreamerProfileArea from "./StreamerProfileArea";

const ViewPage: React.FC = () => {
    return (
        <MainLayout>
            <div id="view-page">
                <div id="top-section">
                    <VideoStreamArea />
                    <LiveChatArea />
                </div>
                <StreamerProfileArea />
            </div>
        </MainLayout>
    );
};

export default ViewPage;
