import React from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Rendering() {
  const [movieInfo, setMovieInfo] = useState([]);
  const [upload, setUpload] = useState("");
  const [movie, uploadMovie] = useState({});
  const [deleted, setDeleted] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    uploadMovie({ ...movie, [e.target.name]: value });
  };

  const fetchDocuments = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "movieInfo"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setMovieInfo(array);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (movies) => {
    await deleteDoc(doc(db, "movieInfo", movies.id));
    let newMovies = movieInfo.filter((newMovie) => {
      return movies.id !== newMovie.id;
    });
    setMovieInfo(newMovies);

    setDeleted(
      <div className="text-center">
        <button className="btn btn-danger mt-3 w-100">
          Movie has been deleted
        </button>
      </div>
    );
  };

  const handleEdit = (movies) => {
    uploadMovie(movies);
  };

  const updateMovie = async (movies) => {
    await setDoc(doc(db, "movieInfo", movies.id), movie, { merge: true });
    let newMovies = movieInfo.map((oldMovies) => {
      if (oldMovies.id === movies.id) {
        return movies;
      } else {
        return oldMovies;
      }
    });
    setMovieInfo(newMovies);
    setUpload([]);
  };

  return (
    <div className="container">
      {deleted}
      <div className="row">
        {movieInfo.length > 0 ? (
          <>
            {movieInfo.map((movies, index) => {
              return (
                <div
                  className="col-12 col-sm-6 col-lg-4 col-xxl-3 d-flex justify-content-center my-3"
                  key={index}
                >
                  <div className="card" style={{ width: "17rem" }}>
                    <img
                      src={movies.posterUrl}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="btn btn-light btn-outline-dark mb-1">
                        In Stock: {movies.stockQuantity}
                      </span>
                      <h5 className="card-title">{movies.movieTitle} </h5>

                      <p className="card-text">{movies.movieDescription} ...</p>

                      <button
                        href="/"
                        className="form-control btn btn-primary mt-1"
                      >
                        {movies.moviePrice} Pkr
                      </button>
                      <button
                        href="/"
                        className="form-control btn btn-danger mt-1"
                        onClick={() => {
                          handleDelete(movies);
                        }}
                      >
                        Delete
                      </button>

                      <button
                        href="/"
                        className="form-control btn btn-success mt-1"
                        data-bs-toggle="modal"
                        data-bs-target="#updateModal"
                        data-bs-whatever="@mdo"
                        onClick={() => {
                          handleEdit(movies);
                        }}
                      >
                        Update
                      </button>
                      <div
                        className="modal fade"
                        id="updateModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Update Movie
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              {upload}
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
                                <label
                                  htmlFor="formFileMultiple"
                                  className="form-label fs-4"
                                >
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
                                <label
                                  htmlFor="formFileMultiple"
                                  className="form-label fs-4"
                                >
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
                                <label
                                  htmlFor="formFileMultiple"
                                  className="form-label fs-4"
                                >
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
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  updateMovie(movie);
                                }}
                              >
                                Update Movie
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
