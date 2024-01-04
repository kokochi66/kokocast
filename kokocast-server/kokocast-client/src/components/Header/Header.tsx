import React, {useState} from 'react';
import './Header.css'; // 별도의 CSS 파일

const Header: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);

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
                    <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/ddee2eb0-2cf3-4ae9-9766-e8099b50da79-profile_image-70x70.png" alt="Profile" className="profile-image" />
                    {/* 드롭다운 메뉴 */}
                    <div className="dropdown-menu">
                        <a href="#">채널 설정</a>
                        <a href="#">프로필 설정</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
