import React, { useState } from "react";
import Select from 'react-select';
import "./SearchForm.css";

/** Search widget.
 *
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor, options }) {
  const [searchTerm, setSearchTerm] = useState("");
  // console.debug("SearchForm", "searchFor=", typeof searchFor);
  // console.log(options)
  // dynamically searches for listings that match characters in search bar
  const filterOptions =
    searchTerm === ''
      ? options.reduce((options, option) => {
        options.push({ label: option.name, value: option.id })
        return options;
      }, [])
      : options.reduce((currentOptions, option) => {
        let isOptionAvailable = option.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (isOptionAvailable) currentOptions.push({ label: option.name, value: option.id });
        return currentOptions;
      }, []);

  console.log(filterOptions)

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(selectedOption) {
    // evt.preventDefault();
    console.log(selectedOption)
    setSearchTerm(selectedOption ? selectedOption.label : "");
  }


  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="search-input row justify-content-center">
          <div className="col-8">
            {/* <input
              className="form-control bg-dark"
              name="searchTerm"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={handleChange}
              /> */}
            <Select
            // debug
              className="form-control bg-dark"
              // value={searchTerm.label}
              name="searchTerm"
              // onChange={handleChange}
              // onChangeonChange={handleSubmit}
              onChange={(selectedOption) => handleChange(selectedOption)}
              options={filterOptions}
              isSearchable
              isClearable
              placeholder="Search listings"
              styles={{
                option: (styles) => ({
                  ...styles,
                  color: 'black',
                }),
              }}
            />

          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-outline-light">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;