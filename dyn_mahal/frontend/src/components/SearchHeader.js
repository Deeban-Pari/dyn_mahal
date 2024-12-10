import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../styles/SearchHeader.css";
import { toast } from 'react-toastify';

const SearchHeader = () => {
  //const [view, setView] = useState("grid");
  const [priceRange, setPriceRange] = useState([120, 1187500]);
  const [sort, setSort] = useState("");
  const [venues,setVenues] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handlePriceChange = (value) => {
    setPriceRange([value, priceRange[1]]);
  };

// Search-Box endpoint
  const getSearchValues = async (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value.trim()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchText: value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred during search');
      }

      const res = await response.json();
      setSearchResults(res.data);
      setShowResults(true);
    } catch (err) {
      toast.error(err.message);
      setSearchResults([]);
      setShowResults(false);
    }
  };

// Sort btn's endpoint
useEffect(()=>{
const sortbtn=async()=>{
  try{
    let sortBy,order;
    if(sort === "Price (Low to High)"){
      sortBy = "price";
      order = "asc";
    }else if(sort === "Price (High to Low)"){
      sortBy = "price";
      order = "desc"
    }else if(sort === "Rating (High to Low)"){
      sortBy = "ratings";
      order = "desc";
    }
    const response=await fetch(`http://localhost:8000/api/sort?sortBy=${sortBy}&order=${order}`,
      {method:"GET"}
    );

    if(!response.ok){
      throw new Error("Failed to fetch sorted data");
    }
    const data = await response.json();
    setVenues(data.data);
    toast.success("Sorting applied successfully!!!");
  } catch(err){
    toast.error(err.message);
  }
};
  if (sort) {
    sortbtn();
  }
},[sort]);

  const handleSelect = (item) => {
    setSearchText(`${item.name}, ${item.location}`);
    setShowResults(false);
  };


  return (
    <div className="search-header-container">
      <div className="search-header py-3 px-4">
        <Row className="d-flex justify-content-between">
          {/* Left Section (Wedding Venues in Chennai) */}
          <Col md={5}>
            <h4 className="fw-bold">Wedding Venues in Chennai</h4>
            <p className="text-muted mb-0">
              Showing <span className="fw-bold">1533</span> results as per your
              search criteria
            </p>
          </Col>

          {/* Price Range Filter */}
          <Col md={4} className="mt-4">
            <h6 className="mb-2">Price</h6>
            <div className="price-slider-container d-flex justify-content-center align-items-center">
              <span className="slider-label-left">₹{priceRange[0]}</span>
              <input
                type="range"
                min="120"
                max="1187500"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="price-slider"
              />
              <span className="slider-label-right">₹{priceRange[1]}</span>
            </div>
          </Col>

          {/* Right Section (Search Box) */}
          <Col md={3} className="d-flex align-items-center mt-3 mt-md-0">
      <InputGroup className="search-box me-3 position-relative">
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search Wedding Venues"
          style={{cursor:"pointer"}}
          value={searchText}
          onChange={getSearchValues}
          onFocus={() => setShowResults(searchResults.length > 0)} // Show dropdown on focus
          onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay to allow item selection
        />
        {showResults && (
          <div className="dropdown-menu show w-55 position-absolute" style={{marginTop:"39px", marginLeft:"23px",cursor:"pointer"}}>
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onMouseDown={() => handleSelect(item)} // Prevent blur during selection
                >
                  {item.name} - {item.location}
                </div>
              ))
            ) : (
              <div className="dropdown-item text-muted">No results found</div>
            )}
          </div>
        )}
      </InputGroup>
    </Col>
        </Row>

        {/* Sorting Buttons */}
        <div className="mt-4">
          <h6 className="mb-2">Sort By</h6>
          <div className="d-flex gap-2">
            <Button
              variant={sort === "Price (Low to High)" ? "primary" : "custom"}
              onClick={() => { 
                setSort("Price (Low to High)");
              }}  
              className="btn btn-primary"
            >
              Price (Low to High)
            </Button>
            <Button
              variant={sort === "Price (High to Low)" ? "primary" : "custom"}
              onClick={() => { 
                setSort("Price (High to Low)");
              }}  
              className="btn btn-primary"
            >
              Price (High to Low)
            </Button>
            <Button
              variant={sort === "Rating (High to Low)" ? "primary" : "custom"}
              onClick={() => { 
                setSort("Rating (High to Low)");
              }}  
              className="btn btn-primary"
            >
              Rating (High to Low)
            </Button>
          </div>
        </div>
        <div className="venues-list">
        {venues.map((venue, index) => (
          <div key={index} className="venue-item">
            <h5>{venue._doc.name}</h5>
            <p>Price: ${venue.price}</p>
            <p>Rating: {venue.ratings}</p>
            <p>Location: {venue._doc.location}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default SearchHeader;
