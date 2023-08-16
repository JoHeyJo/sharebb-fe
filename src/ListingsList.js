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
  const [searchFilter, setSearchFilter] = useState([0]);

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

  /** Triggered by search form submit; reloads. */
  async function search(listing) {
    let response = await ShareBBApi.getListings();
    setListings(response);
  }

  function toggleForm() {
    setToggle((toggle) => !toggle);
  }

  function updateListings(id=0) {
    console.log(id)
    setSearchFilter([id])
  }

  if (isLoading) return <LoadingSpinner />;
  console.log('id in ListingList',searchFilter)
  return (
    <div className="pb-5 container">
      {/* Renders search bar corresponding to view(list or landscape) */}
      {!isList
        ?
        <div className="ListingList-topbar">
          <Button variant="outline-light" onClick={() => setIsList(!isList)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <SearchForm updateOptionId={updateListings} options={listings} />
        </div>

        :
        <div className="ListingList-topbar">
          <Button variant="outline-light" onClick={() => setIsList(!isList)}>
            <FontAwesomeIcon icon={faImage} />
          </Button>
          <SearchForm updateOptionId={updateListings} options={listings} />
        </div>
      }

      {/* adds a button for logged in user to add a listing */}
      {currentUser && (
        <button className="btn btn-outline-light" onClick={toggleForm}>
          Add a listing
        </button>
      )}
      {/* shows form to add listing for logged in user */}
      {currentUser && toggle && (
        <ListingForm addListing={addListing} toggleForm={toggleForm} />
      )}

      {isList
        ?
        listings.map((listing) => (
          // shows the entire list of rendered listings when nothing is being actively search
          (
            searchFilter.includes(0)
            &&
            <ListingCard key={listing.id} listing={listing} isList={isList} />
          )
          ||
          // shows selected list in list view once a listing is selected or search
          (
            searchFilter.includes(listing.id)
            &&
           <ListingCard key={listing.id} listing={listing} isList={isList} />
          )
        ))
        //refactor this mess...adjust the num used to search for correct image in carousel b/c listing searches by 0 index and carousel searches by 1 value
        : <Carousel listingId={searchFilter[0] - 1 < 0 ? 0 : searchFilter[0] - 1} listings={listings} />
      }
    </div>


  );
}

export default ListingsList;
