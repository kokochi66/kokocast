import React, {useState} from 'react';
import './Header.css';
import {useAuth} from "../../context/Auth/AuthContext";
import {getProfileImageUrl} from "../../context/Auth/AuthService"; // 별도의 CSS 파일

const Header: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { isLoggedIn, profileImageUrl, logout } = useAuth();

    const [searchPreviewItems, setSearchPreviewItems] = useState([
        '검색어 1',
        '검색어 2',
        '검색어 3',
        // ... 기타 검색어들
    ]);

    const handleSearchFocus = () => {
        setIsSearchActive(true);
    };

    const handleSearchBlur = () => {
        setIsSearchActive(false);
    };

    return (
        <header id="header">
            <div className="header-container">
                <div className="search-container">
                    <div className="search-input-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="검색..."
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
                        <button className="search-btn">🔍</button>
                        {isSearchActive && (
                            <div className="search-preview">
                                <div className="search-preview-header">최신검색어</div>
                                {searchPreviewItems.map((item, index) => (
                                    <div key={index} className="search-preview-item">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="profile-container">
                    {isLoggedIn ? (
                        <>
                            <img
                                src={profileImageUrl}
                                // alt="Profile"
                                className="profile-image"
                            />
                            <div className="dropdown-menu">
                                <a href="#" onClick={() => window.location.href = '/setting/channel'}>채널 설정</a>
                                <a href="#">프로필 설정</a>
                                <a href="#" onClick={() => logout()}>로그아웃</a>
                            </div>
                        </>
                    ) : (
                        <>
                            <button className="header-login-btn btn" onClick={() => {window.location.href = '/auth/login'}}>
                                로그인
                            </button>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
};

export default Header;
