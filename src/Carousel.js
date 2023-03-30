import React, { useState } from "react";
import './Carousel.css';
import ListingCard from './ListingCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

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
        <Button className="Carousel-button" variant="outline-light"
        onClick={prev}
          style={{
            visibility: currCardIdx === 0 ? "hidden" : 'visible', 
            marginLeft: "1rem",
            marginRight: "1rem"
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
        </Button>

        {console.log(currCard)}
        <ListingCard listing={currCard} />
        <Button variant="outline-light"
        onClick={next}
          style={{
            visibility: currCardIdx === total - 1 ? "hidden" : 'visible',
            marginLeft: "1rem",
            marginRight: "1rem"
          }}>

          <FontAwesomeIcon icon={faForward} />
        </Button>
      </div>
    </div>
  );
}

export default Carousel;