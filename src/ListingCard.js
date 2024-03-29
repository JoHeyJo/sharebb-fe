import { Link } from "react-router-dom";
import "./ListingCard.css";

/** Presentational Component for each list item in list of Listings,
 * linking to their detail page
 * props: listing
 */
function ListingCard({ listing, isList }) {
    console.log(listing)
    return (
        <Link to={`/listings/${listing.id}`}>
            <div className="bg-dark my-3 d-flex p-3 rounded-3 ListingCard-card">
                {listing.imageUrl && <img className={isList ? "listing-thumbnail" : "listing-carousel"} src={listing.imageUrl} alt={`listing-${listing.id}`}/>}
                <div className="text-start ms-5">
                    <h4>{listing.name}</h4>
                    <p>{listing.location}</p>
                    <p>${listing.price}</p>
                    <p>{listing.listingType}</p>
                    <p>{!isList && listing.details}</p>
                </div>
            </div>
        </Link>
    )
}

export default ListingCard