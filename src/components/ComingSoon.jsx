import { useState } from 'react';
import Lightbox from './Lightbox';

function ComingSoon({ movies }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images, index) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  // Hàm random badge (giống Row, nếu muốn)
  const getRandomBadge = () => {
    const badges = ['Trailer'];
    return badges[Math.floor(Math.random() * badges.length)];
  };

  return (
    <div className="row">
      <h2>⏳ Sắp chiếu</h2>
      <div className="row__posters">
        {movies.map((movie, index) => (
          <div key={movie.id} className="poster-container">
            <img
              className="row__poster"
              src={movie.images[0]} // ảnh đại diện là ảnh đầu tiên
              alt={movie.title}
              onClick={() => openLightbox(movie.images, 0)}
            />
            {/* Badge chất lượng (giống Row) */}
            <span className="quality-badge">{getRandomBadge()}</span>
            {/* Overlay hiện tên phim khi hover */}
            <div className="poster-overlay">
              <span className="poster-overlay-title">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <Lightbox
          images={currentImages}
          index={currentIndex}
          onClose={() => setIsOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default ComingSoon;