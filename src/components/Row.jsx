import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Row({ title, movies, isLargeRow }) {
  const navigate = useNavigate();
  const rowRef = useRef(null);

  // Hàm xử lý cuộn ngang
  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Hàm random badge chất lượng (4K, HD...)
  const getRandomBadge = () => {
    const badges = ['4K', 'HD', 'FHD', 'UHD'];
    return badges[Math.floor(Math.random() * badges.length)];
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__container">
        {/* Nút cuộn trái */}
        <button className="scroll-btn scroll-left" onClick={() => scroll('left')}>
          ‹
        </button>

        {/* Danh sách poster */}
        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="poster-container">
              <img
                className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
                src={movie.poster}
                alt={movie.title}
                onClick={() => navigate(`/watch/${movie.id}`)}
              />
              <span className="quality-badge">{getRandomBadge()}</span>
              <div className="poster-overlay">
                <span className="poster-overlay-title">{movie.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Nút cuộn phải */}
        <button className="scroll-btn scroll-right" onClick={() => scroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Row;