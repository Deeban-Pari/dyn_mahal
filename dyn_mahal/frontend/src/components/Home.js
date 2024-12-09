import React from 'react';
import Slide1 from '../utils/Caurosel_img/slide-1.jpg';
import "../styles/Home.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SearchHeader from "./SearchHeader";
import CarouselBody from "./CarouselBody";
// import Auth from './Auth';


function Home() {
  return (
<div className="container mt-4">
  <div className="row">
  {/* <Auth/> */}
  <CarouselBody/>
  <SearchHeader/>
    {Array.from({ length: 12 }).map((_, index) => (
      <div className="col-lg-4 col-md-6 mb-4" key={index}>
        <div className="card hover-card shadow-sm">
          <img
            src={Slide1}
            alt="Venue"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between align-items-center">
              <span className="title-truncate">Blue Bay Beach Resort</span>
              <span className="text-warning">
                <i class="bi bi-star-fill"> 4.6</i>
                <small className="text-muted ms-1">(18 reviews)</small>
              </span>
            </h5>
            <p className="text-muted mb-2">
            <i class="bi bi-geo-alt-fill"></i> Vadanemmeli, Chennai
            </p>
            <p className="text-muted">
            <i class="bi bi-bank"></i> Banquet Halls, Marriage Gardens
            </p>
            <div className="row">
              <div className="col-6">
                <p className="mb-1">Veg</p>
                <p className="fw-bold text-success">₹650 <small>per plate</small></p>
              </div>
              <div className="col-6">
                <p className="mb-1">Non Veg</p>
                <p className="fw-bold text-danger">₹1,000 <small>per plate</small></p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <span className="badge bg-light text-dark">50-700 pax</span>
              <span className="badge bg-light text-dark">24 Rooms</span>
              <span className="badge bg-light text-dark">+4 more</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



  )
}

export default Home