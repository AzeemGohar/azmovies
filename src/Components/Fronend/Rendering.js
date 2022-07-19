import React from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Rendering() {
  const [movieInfo, setMovieInfo] = useState([]);

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

  let newArr = [];
  const addToCart = (movie) => {
    let arr = movie;
    newArr.push(arr);
    window.localStorage.setItem("movies", JSON.stringify(newArr));
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // const localStorageProducts = [
  //   {
  //     image: movieInfo.map((movie, index) => {
  //       return movie.id.posterUrl;
  //     }),
  //     productName: "",
  //     quantity: "",
  //     price: "",
  //   },
  // ];

  // const addToCart = (movie) => {
  //   window.localStorage.setItem(
  //     localStorageProducts,
  //     JSON.stringify(localStorageProducts)
  //   );
  // };

  return (
    <div className="container">
      <div className="row">
        {movieInfo.length > 0 ? (
          <>
            {movieInfo.map((movie, index) => {
              return (
                <div
                  className="col-12 col-sm-6 col-lg-4 col-xxl-3 d-flex justify-content-center my-2"
                  key={index}
                >
                  <div className="card" style={{ width: "17rem" }}>
                    <img
                      src={movie.posterUrl}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="btn btn-dark mb-1">
                        In Stock: {movie.stockQuantity}
                      </span>
                      <h5 className="card-title">{movie.movieTitle} </h5>

                      <p className="card-text">{movie.movieDescription} ...</p>

                      <button
                        href="/"
                        className="form-control btn btn-primary mt-1"
                      >
                        {movie.moviePrice} Pkr
                      </button>
                      <button
                        onClick={() => {
                          addToCart(movie);
                        }}
                        href="/"
                        className="form-control btn btn-success mt-1"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
