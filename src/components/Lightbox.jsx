import { useEffect } from 'react';

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
       
        <img className="lightbox-image" src={images[index]} alt="" />
        {images.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={onPrev}>‹</button>
            <button className="lightbox-nav lightbox-next" onClick={onNext}>›</button>
          </>
        )}
        <div className="lightbox-caption">{`${index + 1} / ${images.length}`}</div>
      </div>
    </div>
  );
}

export default Lightbox;