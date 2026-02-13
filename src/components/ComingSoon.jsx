import { useRef, useState } from 'react';
import Lightbox from './Lightbox';

function ComingSoon({ movies }) {
  const rowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

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

  const getRandomBadge = () => {
    const badges = ['4K', 'HD', 'FHD', 'UHD'];
    return badges[Math.floor(Math.random() * badges.length)];
  };

  return (
    <div className="row">
      <h2>⏳ Sắp chiếu</h2>
      <div className="row__container">
        <button className="scroll-btn scroll-left" onClick={() => scroll('left')}>‹</button>
        <div className="row__posters" ref={rowRef}>
          {movies.map((movie, index) => (
            <div key={movie.id} className="poster-container">
              <img
                className="row__poster"
                src={movie.images[0]}
                alt={movie.title}
                onClick={() => openLightbox(movie.images, 0)}
              />
              <span className="quality-badge">{getRandomBadge()}</span>
              <div className="poster-overlay">
                <span className="poster-overlay-title">{movie.title}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn scroll-right" onClick={() => scroll('right')}>›</button>
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