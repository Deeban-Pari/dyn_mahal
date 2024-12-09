import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../styles/SearchHeader.css";

const SearchHeader = () => {
  const [view, setView] = useState("grid");
  const [priceRange, setPriceRange] = useState([120, 1187500]);
  const [sort, setSort] = useState("");

  const handlePriceChange = (value) => {
    setPriceRange([value, priceRange[1]]);
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
            <InputGroup className="search-box me-3">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control placeholder="Search Wedding Venues..." />
            </InputGroup>
          </Col>
        </Row>

        {/* Sorting Buttons */}
        <div className="mt-4">
          <h6 className="mb-2">Sort By</h6>
          <div className="d-flex gap-2">
            <Button
              variant={sort === "Price (Low to High)" ? "primary" : "custom"}
              onClick={() => setSort("Price (Low to High)")}  className="btn btn-primary"
            >
              Price (Low to High)
            </Button>
            <Button
              variant={sort === "Price (High to Low)" ? "primary" : "custom"}
              onClick={() => setSort("Price (High to Low)")}  className="btn btn-primary"
            >
              Price (High to Low)
            </Button>
            <Button
              variant={sort === "Rating (High to Low)" ? "primary" : "custom"}
              onClick={() => setSort("Rating (High to Low)")}  className="btn btn-primary"
            >
              Rating (High to Low)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
