import React, {ChangeEvent, useEffect, useState} from 'react';
import './ChannelSettingPage.css'
import MainLayout from '../../layouts/MainLayout';
import {api} from "../../context/Api";

const ChannelSettingPage: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [channelDesc, setChannelDesc] = useState<string>('');
    const [channelTitle, setChannelTitle] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<Boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>(['검색 결과 1', '검색 결과 2', '검색 결과 3']);
    const [categoryInput, setCategoryInput] = useState<any>('');
    const [categories, setCategories] = useState<String[]>([]);
    const [streamKey, setStreamKey] = useState<string>('테스트 스트림 키');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        api.get('/api/channel/setting')
            .then(res => {
                if (res){
                    setNickname(res.data.nickname);
                    setChannelDesc(res.data.channelDescription);
                    setChannelTitle(res.data.streamingTitle);
                    setStreamKey(res.data.streamKey);
                }
            });
    }, []);

    const handleSearchFocus = () => {
        setSearchTerm(true);
    };

    const handleSearchBlur = () => {
        setSearchTerm(false);
    };


    const handleAddCategory = () => {
        console.log('handleAddCategory');
        if (categoryInput) {
            console.log('categoryinput = ' , categoryInput)
            setCategories(prev => [...prev, categoryInput]);
            setCategoryInput(''); // 입력 필드 초기화
        }
    };

    const handleCategoryKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddCategory();
        }
    };

    const handleRemoveCategory = (indexToRemove: number) => {
        setCategories(categories.filter((_, index) => index !== indexToRemove));
    };


    const copyToClipboardStreamKey = () => {
        navigator.clipboard.writeText(streamKey).then(() => {
            alert('클립보드에 복사되었습니다.');
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
        });
    };

    // 파일 선택 시 미리보기
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // 파일 형식 확인
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다.');
                return;
            }

            // 파일 크기 확인 (10MB 이하)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                alert('파일 크기는 10MB를 초과할 수 없습니다.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setSelectedImage(e.target?.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleChangeNickname = () => {
        api.post('/api/channel/nickname', {
            "nickname": nickname
        })
            .then(res => {
                if (res){
                    alert('닉네임이 변경되었습니다.')
                    setNickname(res.data.nickname);
                }
            });
    }


    return (
        <MainLayout>
            <div id="channel-setting-container" className="container">
                <h1 className="title">Channel Setting</h1>

                <div className="input-section nickname-section">
                    <input type="text"
                           className="input-field"
                           placeholder="Nickname"
                           value={nickname}
                           onChange={(e) => setNickname(e.target.value)}
                    />
                    <button className="button" onClick={handleChangeNickname}>변경</button>
                </div>
                <p>닉네임은 마지막 변경으로부터 3개월 후 변경이 가능합니다.</p>

                <div className="profile-upload-section">
                    <div className="profile-image">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Profile" className="profile-image-image" />
                        ) : (
                            <div className="placeholder">프로필 이미지</div>
                        )}
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="image-upload-input"
                        />
                        <label htmlFor="image-upload-input" className="button">
                            프로필 사진 업로드
                        </label>
                        <button className="button">삭제</button>
                    </div>
                </div>
                <p>10MB 이내의 JPEG, PNG, GIF 형식이어야 합니다. <br/> 프로필 이미지는 마지막 변경으로부터 3개월 후 변경이 가능합니다.</p>

                <div className="textarea-section">
                    <textarea className="input-field large-input"
                              placeholder="Channel Description"
                              value={channelDesc}
                              onChange={(e) => setChannelDesc(e.target.value)}
                    />

                    <button className="button">변경</button>
                </div>
                <p>채널에 대한 정보를 300자 미만으로 설명하세요.</p>

                <div className="input-section">
                    <input type="text"
                           className="input-field"
                           placeholder="Channel Title"
                           value={channelTitle}
                           onChange={(e) => setChannelTitle(e.target.value)}
                    />
                    <button className="button">변경</button>
                </div>
                <p>방송에서 표시할 제목을 20자 이내로 작성하세요.</p>

                <div className="input-section">
                    <input type="text"
                           className="input-field"
                           placeholder="Playing Game"
                           onFocus={handleSearchFocus}
                           onBlur={handleSearchBlur}

                    />
                    {/* 검색 결과 미리보기 추가 필요 */}
                    <button className="button">변경</button>

                    {searchTerm && searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((result, index) => (
                                <div key={index} className="search-result-item">
                                    {result}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <p>플레이 중인 게임을 선택하세요.</p>

                <div className="input-section">
                    <input type="text"
                           className="input-field"
                           placeholder="카테고리"
                           value={categoryInput}
                           onChange={(e) => setCategoryInput(e.target.value)}
                           onKeyDown={handleCategoryKeyDown}
                    />
                    <button className="button" onClick={handleAddCategory}>추가</button>
                </div>
                <div className="category-list">
                    {categories.map((category, index) => (
                        <span key={index}
                              className="category-tag"
                              onClick={() => handleRemoveCategory(index)}>
                            {category}
                        </span>
                    ))}
                </div>

                <div className="input-section">
                    <input type="password"
                           className="input-field stream-key-input"
                           placeholder="스트림 키"
                           value={streamKey}
                           disabled />
                    <button className="button" style={{ marginRight: '10px' }} onClick={copyToClipboardStreamKey}>복사</button>
                    <button className="button">초기화</button>
                </div>
                <p>스트림 키를 당신의 OBS studio에 입력하세요.</p>
            </div>
        </MainLayout>
    );
};

export default ChannelSettingPage;
