import React from "react";
import "./carousel.css";

const initialItems = Array.from(new Array(9)).map((_, idx) => {
  return idx + 1;
});

export default function Carousel() {
  let [index, setIndex] = React.useState(0);
  let [items] = React.useState(initialItems);
  let ref = React.useRef(null);

  React.useEffect(() => {
    setInterval(() => {
      setIndex((idx) => idx + 1)
    }, 5000);
  }, []);

  React.useEffect(() => {
    window.requestAnimationFrame(rotateCarousel);
  }, [rotateCarousel]);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handlePreviousClick() {
    setIndex(index - 1);
  }

  function rotateCarousel() {
    let carousel;

    if (ref.current) {
      carousel = ref.current;
    }

    const theta = 360 / items.length;
    const cellSize = carousel.offsetWidth;
    const cellRange = items.length;
    const radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellRange));
    const angle = theta * index * -1;
    carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
  }

  return (
    <>
      <div className="scene">
        <div ref={ref} className="carousel">
          {items.map((item) => {
            return (
              <div key={item} className="carousel__cell">
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p>
          <button onClick={handlePreviousClick}>Previous</button>
          <button onClick={handleNextClick}>Next</button>
        </p>
      </div>
    </>
  );
}
