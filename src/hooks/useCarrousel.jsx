import { useState } from 'react';

const useCarousel = (length) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const goPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  return { currentIndex, goNext, goPrevious };
};

export default useCarousel;
