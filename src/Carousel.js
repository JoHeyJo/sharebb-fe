import React, { useState } from "react";
import './Carousel';
import ListingCard from './ListingCard';

/** Carousel: displays images and arrows to navigate through them 
 * 
 * Props:
 * - photos; array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current index
 * 
 * App --> Carousel --> Card
*/


function Carousel({ listings }) {
  const [currCardIdx, setCurrCardIdx] = useState(2);

  const currCard = listings[currCardIdx];
  const total = listings.length;


  /** Decrements currCardIdx state by 1 */
  function prev() {
    setCurrCardIdx(currCardIdx - 1);
  }
  /** Increments currCardIdx state by 1 */
  function next() {
    setCurrCardIdx(currCardIdx + 1);
  }
  return (
    <div className="Carousel">
      {/* <h1>{title}</h1> */}
      <div className="Carousel-main">
        <i
          className="fas fa-chevron-circle-left fa-2x"
          style={{ visibility: currCardIdx === 0 ? "hidden" : 'visible' }}
          onClick={prev}
        />
        {console.log(currCard)}
        <ListingCard listing={currCard} />
        <i
          className="fas fa-chevron-circle-right fa-2x"
          onClick={next}
          style={{ visibility: currCardIdx === total - 1 ? "hidden" : 'visible' }}
        />
      </div>
    </div>
  );
}

export default Carousel;