import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function Orders() {
  const [movieInfo, setMovieInfo] = useState([]);
  const fetchDocuments = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "orders"));
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
  return (
    <div
      className="container bg-light border-light mt-2 "
      style={{ minHeight: "80vh" }}
    >
      <div>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">City</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Movie</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {movieInfo.map((movie) => {
              return (
                <tr>
                  <td scope="col">{movie.Cname}</td>
                  <td scope="col">{movie.city}</td>
                  <td scope="col">{movie.address}</td>
                  <td scope="col">{movie.phNumber}</td>
                  <td scope="col">{movie.movieName}</td>
                  <td scope="col">{movie.quantity}</td>
                  <td scope="col">{movie.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
