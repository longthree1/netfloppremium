import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nowPlaying, bannerMovies } from '../data/movies';
import Navbar from '../components/Navbar';

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const allMovies = [...nowPlaying, ...bannerMovies];
  const movie = allMovies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div style={{ padding: 100, textAlign: 'center', color: 'white' }}>
        <h2>Không tìm thấy phim</h2>
        <button onClick={() => navigate('/')}>Về trang chủ</button>
      </div>
    );
  }

  // --- YouTube IFrame API Logic ---
  useEffect(() => {
    // Hàm này sẽ được gọi khi API YouTube sẵn sàng
    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
         playerRef.current = new window.YT.Player('youtube-player', {
           videoId: movie.youtubeId,
           playerVars: {
             autoplay: 1,
             mute: 1, // BẮT BUỘC để video tự động phát
             rel: 0,
             modestbranding: 1,
             origin: window.location.origin,
           },
           events: {
             'onReady': onPlayerReady,
             'onStateChange': onPlayerStateChange,
           }
         });
      }
    };

    // Tải script của YouTube API nếu chưa có
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else if (window.YT && window.YT.Player && !playerRef.current) {
      // Nếu API đã được tải, tạo player luôn
      window.onYouTubeIframeAPIReady();
    }

    // Cleanup function
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [movie.youtubeId]); // Chạy lại khi youtubeId thay đổi

  const onPlayerReady = (event) => {
    console.log('Player đã sẵn sàng và đang phát (ở trạng thái tắt tiếng).');
    setIsPlayerReady(true);
    // Tự động bật tiếng sau khi video đã phát được 1 giây (tạo cảm giác mượt mà)
    setTimeout(() => {
      if (playerRef.current && playerRef.current.unMute) {
        playerRef.current.unMute();
        console.log('Đã bật tiếng!');
      }
    }, 500); // Có thể điều chỉnh thời gian này (500ms - 1000ms)
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      navigate('/'); // Quay về trang chủ khi video kết thúc
    }
  };
  // --- Kết thúc logic YouTube API ---

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '100px 20px 50px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', marginBottom: 20 }}>{movie.title}</h1>
        {/* Container cho YouTube Player */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
          <div
            id="youtube-player"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></div>
        </div>
        {/* Phần mô tả có nút Xem thêm */}
        <div style={{ marginTop: 20 }}>
          <p
            style={{
              color: 'white',
              fontSize: 18,
              lineHeight: 1.6,
              marginBottom: 10,
              whiteSpace: 'pre-line'
            }}
          >
            {showFullDesc ? movie.description : `${movie.description.slice(0, 150)}...`}
          </p>
          {movie.description.length > 150 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              style={{
                background: 'none',
                border: 'none',
                color: '#e50914',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                padding: '5px 0',
              }}
            >
              {showFullDesc ? 'Thu gọn' : 'Xem thêm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Watch;