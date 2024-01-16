import React from 'react';
import './ChannelSettingPage.css'
import MainLayout from '../../layouts/MainLayout';

const ChannelSettingPage: React.FC = () => {
    return (
        <MainLayout>
            <div id="channel-setting-container" className="container">
                <h1 className="title">Channel Setting</h1>

                <div className="input-section nickname-section">
                    <input type="text" className="input-field" placeholder="Nickname"/>
                    <button className="button">변경</button>
                </div>
                <p>닉네임은 마지막 변경으로부터 3개월 후 변경이 가능합니다.</p>

                <div className="profile-upload-section">
                    <div className="profile-image"></div>
                    <div>
                        <button className="button">프로필 사진 업로드</button>
                        <button className="button">삭제</button>
                    </div>
                </div>
                <p>10MB 이내의 JPEG, PNG, GIF 형식이어야 합니다.</p>

                <div className="textarea-section">
                    <textarea className="input-field large-input" placeholder="Channel Description"></textarea>
                    <button className="button">변경</button>
                </div>
                <p>채널에 대한 정보를 300자 미만으로 설명하세요.</p>

                <div className="input-section">
                    <input type="text" className="input-field" placeholder="Channel Title"/>
                    <button className="button">변경</button>
                </div>
                <p>방송에서 표시할 제목을 20자 이내로 작성하세요.</p>

                <div className="input-section">
                    <input type="text" className="input-field" placeholder="Playing Game"/>
                    {/* 검색 결과 미리보기 추가 필요 */}
                    <button className="button">변경</button>
                </div>
                <p>플레이 중인 게임을 선택하세요.</p>

                <div className="input-section">
                    <input type="text" className="input-field" placeholder="카테고리"/>
                    <button className="button">추가</button>
                    {/* 추가된 카테고리 표시 필요 */}
                </div>

                <div className="input-section">
                    <input type="text" className="input-field stream-key-input" placeholder="스트림 키"/>
                    <button className="button">복사</button>
                    <button className="button">초기화</button>
                </div>
                <p>스트림 키를 당신의 OBS studio에 입력하세요.</p>
            </div>
        </MainLayout>
    );
};

export default ChannelSettingPage;
