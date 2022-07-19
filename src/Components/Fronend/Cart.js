import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
export default function Cart() {
  const [getMovie, setGetMovie] = useState(
    JSON.parse(window.localStorage.getItem("movies"))
  );

  const clearCart = () => {
    localStorage.removeItem("movies");
  };

  var total = 0;

  const [upload, setUpload] = useState("");
  const [use, setUse] = useState("");
  const [use1, setUse1] = useState("");
  const [use2, setUse2] = useState("");
  const [ifLogin, setIfLogin] = useState("");
  const [count, setCount] = useState(1);

  const [movie, uploadMovie] = useState({
    Cname: "",
    city: "",
    address: "",
    phNumber: "",
    movieName: [],
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    uploadMovie({ ...movie, [e.target.name]: value });
  };

  const { Cname, city, address, phNumber, quantity, price, movieName } = movie;
  movie.movieName.push(use);

  const addMovieInfo = async () => {
    try {
      const movieCollectionRef = await addDoc(collection(db, "orders"), {
        Cname,
        city,
        address,
        phNumber,
        movieName: use,
        quantity: use1,
        price: use2,
      });

      setUpload(
        <button className="form-control btn btn-success pe-none">
          Your order has been placed
        </button>
      );
    } catch (e) {
      console.log("Error", e);
    }
  };
  const [renderCart, setRenderCart] = useState("");

  useEffect(() => {
    setRenderCart(
      JSON.parse(window.localStorage.getItem("movies")) !== null
        ? getMovie.map((movie, index) => {
            return (
              <tr key={index}>
                <td className="w-auto">
                  <img style={{ width: "50px" }} alt="" src={movie.posterUrl} />
                </td>
                <td className="align-middle">{movie.movieTitle}</td>
                {setUse(movie.movieTitle)}
                {setUse1(movie.stockQuantity)}
                {setUse2(total)}
                <td className="align-middle">
                  <button
                    className="btn btn-light p-1 me-1"
                    onClick={() => {
                      if (count > 1) {
                        setCount(count - 1);
                      }
                    }}
                  >
                    <RemoveIcon style={{ fontSize: "medium" }} />
                  </button>

                  {count}
                  <button
                    className="btn btn-light p-1 ms-1"
                    style={{ fontSize: "medium" }}
                    onClick={() => {
                      if (count >= movie.stockQuantity) {
                        alert("Stock Limit Reached");
                      } else {
                        setCount(count + 1);
                      }
                    }}
                  >
                    <AddIcon />
                  </button>
                </td>
                <td className="align-middle">{count * movie.moviePrice}</td>
              </tr>
            );
          })
        : "There is no item in the cart"
    );
  }, [count]);

  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setIfLogin(
          <div
            className="modal fade"
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalToggleLabel">
                    Enter required details
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
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Reciever's name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="Cname"
                      value={movie.movieTitle}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Price */}
                  <div className="mx-5 mb-3">
                    <label htmlFor="" className="d-block fs-4">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your city"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="city"
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
                      Address
                    </label>
                    <input
                      className="form-control"
                      style={{ height: "75px" }}
                      type="text"
                      id="formFileMultiple"
                      placeholder="Contact Address "
                      name="address"
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
                      Phone Number
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      id="formFileMultiple"
                      placeholder="Contact number"
                      name="phNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={addMovieInfo}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        alert("Kindly Login First");
        return;
      }
    });
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}

      <button
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCart"
        style={{
          borderColor: "rgba(255,255,255,.1)",
          borderStyle: "solid",
          borderWidth: "1px",
          backgroundColor: "transparent",
        }}
      >
        <img
          src="https://img.icons8.com/fluency/25/undefined/shopping-cart-loaded.png"
          alt="cart"
        />
        Cart
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModalCart"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Items List
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Poster</th>
                    <th scope="col">Movie</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {JSON.parse(window.localStorage.getItem("movies")) !== null
                    ? renderCart
                    : "There are no items in the cart."}
                  <tr>
                    <td>
                      {getMovie !== null ? (
                        <button className="btn btn-danger" onClick={clearCart}>
                          Clear
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                    <td></td>
                    <td>
                      <label
                        htmlFor=""
                        className="b-2"
                        style={{ verticalAlign: "middle" }}
                      >
                        Total:
                      </label>
                    </td>
                    <td>
                      <button className="btn btn-dark">
                        {JSON.parse(window.localStorage.getItem("movies")) !==
                        null
                          ? getMovie.map((movie) => {
                              total +=
                                parseInt(movie.moviePrice) * parseInt(count);
                            })
                          : ""}
                        {JSON.parse(window.localStorage.getItem("movies")) !==
                        null
                          ? total
                          : 0}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                onClick={checkLogin}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {ifLogin}
    </>
  );
}
