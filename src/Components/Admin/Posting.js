import React from "react";
import { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Posting() {
  const [movie, uploadMovie] = useState({
    movieTitle: "",
    moviePrice: "",
    movieDescription: "",
    stockQuantity: "",
    posterUrl: "",
  });

  const [upload, setUpload] = useState("");
  const { movieTitle, moviePrice, movieDescription, stockQuantity, posterUrl } =
    movie;

  const addMovieInfo = async () => {
    try {
      const movieCollectionRef = await addDoc(collection(db, "movieInfo"), {
        movieTitle,
        moviePrice,
        movieDescription,
        stockQuantity,
        posterUrl,
      });
      console.log("Id", movieCollectionRef);
      setUpload(
        <button className="form-control btn btn-success pe-none">
          Movie has been posted
        </button>
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    uploadMovie({ ...movie, [e.target.name]: value });
  };
  return (
    <div id="postingForm" className="container border  p-0">
      <h1 className="text-center display-4 mb-4 mt-2">
        Enter the required details
      </h1>

      <div className="mx-5 mb-3">{upload}</div>

      {/* Movie Title */}
      <div className="mx-5 mb-3">
        <label htmlFor="" className="d-block fs-4">
          Movie title
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Name of the movie"
          aria-label="Username"
          aria-describedby="basic-addon1"
          name="movieTitle"
          value={movie.movieTitle}
          onChange={handleChange}
        />
      </div>

      {/* Price */}
      <div className="mx-5 mb-3">
        <label htmlFor="" className="d-block fs-4">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Price of the movie"
          aria-label="Username"
          aria-describedby="basic-addon1"
          name="moviePrice"
          value={movie.moviePrice}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="mx-5 mb-3">
        <label htmlFor="formFileMultiple" className="form-label fs-4">
          Movie Description
        </label>
        <input
          className="form-control"
          style={{ height: "75px" }}
          type="text"
          id="formFileMultiple"
          placeholder="Type lead story"
          name="movieDescription"
          value={movie.movieDescription}
          onChange={handleChange}
          maxLength="75"
        />
      </div>

      {/* Stock */}
      <div className="mx-5 mb-3">
        <label htmlFor="formFileMultiple" className="form-label fs-4">
          Stock Quantity
        </label>
        <input
          className="form-control"
          type="number"
          id="formFileMultiple"
          placeholder="Enter the available quantity"
          name="stockQuantity"
          value={movie.stockQuantity}
          onChange={handleChange}
        />
      </div>

      {/* Upload Image */}
      <div className="mx-5 mb-3">
        <label htmlFor="formFileMultiple" className="form-label fs-4">
          Movie Poster URL
        </label>
        <input
          className="form-control"
          type="input"
          id="formFileMultiple"
          placeholder="Enter the url of the movie poster"
          name="posterUrl"
          value={movie.posterUrl}
          onChange={handleChange}
        />
      </div>

      {/* Submit */}
      <div className="mx-5 mb-3 ">
        <input
          type="button"
          className="btn btn-primary w-100 fs-5"
          value="Add Movie"
          onClick={addMovieInfo}
        />
      </div>
    </div>
  );
}
