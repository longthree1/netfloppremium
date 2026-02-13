import { useNavigate } from 'react-router-dom';

function Row({ title, movies, isLargeRow }) {
  const navigate = useNavigate();

  const getRandomBadge = () => {
    const badges = ['4K'];
    return badges[Math.floor(Math.random() * badges.length)];
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <div key={movie.id} className="poster-container">
            <img
              className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
              src={movie.poster}
              alt={movie.title}
              onClick={() => navigate(`/watch/${movie.id}`)}
            />
            <span className="quality-badge">{getRandomBadge()}</span>
            {/* Overlay hiện tên phim khi hover */}
            <div className="poster-overlay">
              <span className="poster-overlay-title">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;