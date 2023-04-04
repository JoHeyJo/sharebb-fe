import React, { useEffect, useState } from "react";
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

function SearchForm({ searchFor, options, updateOptionId }) {
  const [allOptions, setAllOptions] = useState(options)
  const [searchTerm, setSearchTerm] = useState({ label: "", value: "" });
  // dynamically searches for listings that match characters in search bar
  const filterOptions =
    searchTerm.label === ''
      ? options.reduce((options, option) => {
        options.push({ label: option.name, value: option.id })
        return options;
      }, [])
      : options.reduce((currentOptions, option) => {
        let isOptionAvailable = option.name.toLowerCase().includes(searchTerm.label.toLowerCase());
        if (isOptionAvailable) currentOptions.push({ label: option.name, value: option.id });
        return currentOptions;
      }, []);


  /**Submits id for filter*/
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    // searchFor(searchTerm.label.trim() || undefined);
    // setSearchTerm(searchTerm.label.trim());
    updateOptionId(searchTerm.value);
  }

  /** Update form fields */
  function handleChange(selectedOption) {
    // evt.preventDefault();
    console.log(selectedOption.value)
    setSearchTerm(selectedOption ? selectedOption : "");
  }

  function onClear(){
    updateOptionId(0)
  }

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="search-input justify-content-center">
          <div className="">
            {/* <input
              className="form-control bg-dark"
              name="searchTerm"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={handleChange}
              /> */}
            <Select
              className="form-control bg-dark"
              name="searchTerm"
              onChange={(selectedOption) => {
                if (!selectedOption) {
                  setSearchTerm({ label: "", value: "" });
                  onClear();
                } else {
                  handleChange(selectedOption);
                }
              }}
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
          <button type="submit" className="btn btn-outline-light">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;