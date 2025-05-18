import React from 'react';
import './VideoArea.css';
import MoreButton from "../../../components/Sidebar/MoreButton";

type VideoAreaProps = {
    title: string;
};


const VideoArea: React.FC<VideoAreaProps> = ({title}) => {
    // 임시 비디오 데이터
    const videos = [
        {
            id: 1,
            title: "비디오 제목 1",
            streamer: "스트리머 1",
            profileImg: "https://nng-phinf.pstatic.net/MjAyMzEyMjBfNzgg/MDAxNzAyOTk5MDU4NTQ1.q74UANafs4egu_GflqIXrKZvqweabjdsqb3q7F-vEPEg.0DlZf3Myopu6ITUmTkOYLU-GKcBLotgKn61A0o9ZAN4g.PNG/7d354ef2-b2a8-4276-8c12-5be7f6301ae0-profile_image-600x600.png?type=f120_120_na",
            thumbnailImg: "https://video-phinf.pstatic.net/20240103_263/1704208094651sRbgu_JPEG/4b54552d-a980-11ee-b320-a0369ffabecc_03.jpg",
        },
        {
            id: 2,
            title: "비디오 제목 1",
            streamer: "스트리머 1",
            profileImg: "https://nng-phinf.pstatic.net/MjAyMzEyMjJfMjg0/MDAxNzAzMjQyNTE3MDk5.CuBTzC4M3BeLP9NYEY-p1rYTxW3qfyhTL_zNHI6qaUYg.ohdthdl_5mMiiLo29KGJ_rimQSVm1DNO8Z2dhuhtyugg.PNG/4CBB95E5-2793-46B3-A7D1-F2DD167452CA.png?type=f120_120_na",
            thumbnailImg: "https://video-phinf.pstatic.net/20240104_1/1704310076489ROcF5_JPEG/d37871fc-aa6c-11ee-badd-48df37e2c30a_03.jpg",
        },
        {
            id: 3,
            title: "비디오 제목 1",
            streamer: "스트리머 1",
            profileImg: "https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTc2/MDAxNzAyOTc3NjA0NTc4.Vd9lD67bKMJbZS8aBvyX8KjDqKLCR9zCuhxGilqhSEQg.Pdsam1-hUc0QiCEjOmOm6-bbwHeLXBQ2W_udwZOzyskg.PNG/2.png?type=f120_120_na",
            thumbnailImg: "https://video-phinf.pstatic.net/20240103_146/1704240101187x21yF_JPEG/1b43cc3c-a9ca-11ee-9cb2-a0369ffddd04_03.jpg",
        },
        {
            id: 4,
            title: "비디오 제목 1",
            streamer: "스트리머 1",
            profileImg: "https://nng-phinf.pstatic.net/MjAyNDAxMDVfMjA5/MDAxNzA0NDEyMzgxNzI1.aHeJKH7FXSP3rkqnyOWx5lbgdoXG5HEuKaItBJjlwccg.jWqm6lPH-P0yMWL4IHEV1qs_ZiGl-ExJEkjDFLSiwo8g.JPEG/%EB%B0%A9%EC%86%A1_%ED%94%84%EB%A1%9C%ED%95%84.jpg?type=f120_120_na",
            thumbnailImg: "https://video-phinf.pstatic.net/20240103_146/1704240101187x21yF_JPEG/1b43cc3c-a9ca-11ee-9cb2-a0369ffddd04_03.jpg",
        },

        {
            id: 5,
            title: "비디오 제목 1",
            streamer: "스트리머 1",
            profileImg: "https://nng-phinf.pstatic.net/MjAyMzEyMTlfMTA3/MDAxNzAyOTU4NTc2Nzk3.qVIwDf_v-PcR5fIhdqftltltXmyuCHZdOW9SwjZPBhsg.sGGHdME6yWm_sXMtmcnd6YObCnzlaqjVCCOKfb3OqJYg.PNG/6_1.png?type=f120_120_na",
            thumbnailImg: "https://video-phinf.pstatic.net/20231226_38/1703548381790CdjNX_JPEG/11b4d905-a380-11ee-919a-80615f0bcd76_03.jpg",
        },
        {
            id: 6,
            title: "비디오 제목 1",
            streamer: "스트리머 1",
            profileImg: "https://nng-phinf.pstatic.net/MjAyMzEyMTlfNTQg/MDAxNzAyOTY4NDIzNjE0.GN9Dk4gQE0lIL2pfJ1mIz1VnwxaC6aCDFP7XTumaskkg.HwHFCCnnrnHiJfbq6zogmkKyyr7Y4oiaLdisS7TgAXAg.PNG/%ED%91%B8%EB%A6%B0.png?type=f120_120_na",
            thumbnailImg: "https://video-phinf.pstatic.net/20231230_192/1703902546834rV2lT_JPEG/9d9cdc32-a6b8-11ee-8a2a-a0369ffdd814_03.jpg",
        },
    ];

    const handleLoadMore: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        // 여기에 더보기 버튼 클릭 시의 로직
        console.log('더보기')
    };

    const handleMoveToViewPage = () => {
        window.location.href = '/view';
    };


    return (
        <div className="container video-area mt-3">
            <h2 className="text-left video-area-title mb-4">{title}</h2> {/* 제목 추가 */}
            <div className="row">
                {videos.map(video => (
                    <div key={video.id} className="col-xxl-2 col-xl-4 col-sm-6 mb-3">
                        <div className="card video-card h-100" onClick={handleMoveToViewPage}>
                            <div className="video-thumbnail">
                                <img src={video.thumbnailImg} className="video-card-img"/>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <img src={video.profileImg} alt="Profile"
                                         className="rounded-circle me-2 profile-img"/>
                                    <div className="card-profile">
                                        <h6 className="card-title mb-0">{video.streamer}</h6>
                                        <small className="card-description">{video.title}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-3">
                <MoreButton onClick={handleLoadMore}/>
            </div>
        </div>
    );
};

export default VideoArea;
