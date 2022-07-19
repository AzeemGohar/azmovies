import React from "react";
import { Outlet } from "react-router-dom";
import Rendering from "./Rendering";
export default function Carousel() {
  return (
    <>
      <Outlet />
      {/* <!--Carousel--> */}
      <div className="container-fluid p-0">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={require("./Images/Endgame.png")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <img
                  src={require("./Images/avangers-endgame-logo.png")}
                  style={{ width: "25%" }}
                  alt=""
                />
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("./Images/No Way Home.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <img
                  src={require("./Images/No_way_home_logo.png")}
                  style={{ width: "25%" }}
                  alt=""
                />
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require("./Images/Tomorrow War.jpg")}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <img
                  src={require("./Images/The Tomorrow War Logo.png")}
                  style={{ width: "25%" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* <!--Site Intro--> */}
      <div className="container my-5">
        <h3
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Welcome to the site AZ Movies.COM
        </h3>
        <p style={{ textAlign: "justify" }}>
          4K movie is now available for everyone, download movies and enjoy
          viewing in super resolution Ultra HD 2160p. Download 4K quality
          movies: 4K BDRemux is the quality of the original Blu-ray disc
          reassembled into a container, format mkv, 4K BDRip is a small file
          size. See 4K films on 4KTV, edit 4K video on Premire Pro, play 4K
          Blu-ray on 4K projector, etc. Full Movies 4K x265 hdr, and Dolby
          Vision. AZMovies.COM - premium site 4K MOVIES for download where
          everyone will find a bit of himself.
        </p>
        <hr />
      </div>
      <Rendering />
    </>
  );
}
