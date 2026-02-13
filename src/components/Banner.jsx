import { useNavigate } from 'react-router-dom';
import { bannerMovies } from '../data/movies';

function Banner() {
  const navigate = useNavigate();
  const bannerMovie = bannerMovies[0];

  const handlePlay = () => {
    navigate(`/watch/${bannerMovie.id}`);
  };

  const handleInfo = () => {
  window.open('https://www.youtube.com/@mixigaming3con', '_blank');
};

  return (
    <header
      className="banner"
      style={{
        backgroundImage: 'url("/images/mixi.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{bannerMovie.title}</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__button--play" onClick={handlePlay}>
            ▶ Play
          </button>
          <button className="banner__button banner__button--info" onClick={handleInfo}>
            ⓘ More Info
          </button>
        </div>
        <p className="banner__description">{bannerMovie.description}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;