import "./ListingsList.css";
import { useState, useEffect } from "react";
import ShareBBApi from "./api";
import LoadingSpinner from "./shared/LoadingSpinner";
import ListingForm from "./ListingForm";
import ListingCard from "./ListingCard";
import { useContext } from "react";
import UserContext from "./UserContext";
import SearchForm from "./SearchForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faImage } from '@fortawesome/free-solid-svg-icons';
import Carousel from "./Carousel";
import './ListingsList.css';
import Button from 'react-bootstrap/Button';
/** ListingsList component
 *
 * state: listings
 * props: none
 */

function ListingsList() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [isList, setIsList] = useState(true);

  useEffect(function getListings() {
    async function fetchListingsFromAPI() {
      const listingsResp = await ShareBBApi.getListings();
      setListings([...listingsResp]);
      setIsLoading(false);
    }
    if (isLoading) fetchListingsFromAPI();
  }, []);

  async function addListing(formData) {
    const response = await ShareBBApi.addListing(formData);
    setListings([...listings, response]);
  }

  /** Triggered by search form submit; reloads jobs. */
  async function search(listing) {
    let response = await ShareBBApi.getListings(listing);
    setListings(response);
  }

  function toggleForm() {
    setToggle((toggle) => !toggle);
  }

  function updateListings(listingId){
    console.log(listingId,listings)
    const filteredListing = listings.filter(l => listingId === l.id)
    setListings(filteredListing)
    
    console.log(filteredListing)
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="pb-5 container">
      {!isList
        ?
        <div className="ListingList-topbar">
          <Button variant="outline-light" onClick={() => setIsList(!isList)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <SearchForm updateOptionId={updateListings} options={listings} searchFor={search} />
          </div>

          :
          <div className="ListingList-topbar">
            <Button variant="outline-light" onClick={() => setIsList(!isList)}>
              <FontAwesomeIcon icon={faImage} />
            </Button>
            <SearchForm updateOptionId={updateListings} options={listings} searchFor={search} />
          </div>
          }


          {currentUser && (
            <button className="btn btn-outline-light" onClick={toggleForm}>
              Add a listing
            </button>
          )}

          {currentUser && toggle && (
            <ListingForm addListing={addListing} toggleForm={toggleForm} />
          )}

          {isList
            ?
            listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} isList={isList} />
            ))
            : <Carousel listings={listings} />
          }
    </div>


  );
}

      export default ListingsList;
