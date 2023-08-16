import React, { useState, useEffect } from "react";
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

function Carousel({ listingId, listings }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  console.log('id in Carousel',listingId)
  console.log('index in Carousel',currCardIdx)
  const currCard = listings[currCardIdx];
  const total = listings.length;

  /** Decrements currCardIdx state by 1 */
  function prev() {
    setCurrCardIdx(idx => idx - 1);
  }

  /** Increments currCardIdx state by 1 */
  function next() {
    setCurrCardIdx(idx => idx + 1);
  }

  function findIndex(listings,id){
    let idx = undefined;
    for (let i = 0; i < listings.length; i++) {
      if(listings[i].id === id) {
        return idx = i
      };
    }
    return idx;
  }

  useEffect(()=>{
    if(listingId === 0){
      setCurrCardIdx(0)
    } else {
      const idx = findIndex(listings,listingId);
      setCurrCardIdx(idx + 1);
    }
  },[listingId])

  return (
    <div className="Carousel">
      {/* <h1>{title}</h1> */}
      <div className="Carousel-main">
    {console.log('listings in Carousel',listings)}
    {console.log('card in Carousel',currCard)}
        <ListingCard listing={currCard}/>
        
        <Button className="Carousel-button" variant="outline-light"
        onClick={prev}
          style={{
            visibility: currCardIdx === 0 ? "hidden" : 'visible', 
            marginLeft: "1rem",
            marginRight: "1rem"
          }}>
          <FontAwesomeIcon icon={faBackward} />
        </Button>

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