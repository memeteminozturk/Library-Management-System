import React from "react";
import "./card.css";
import { FiBook } from "react-icons/fi";

function Card({ bookname, stock, author, date, bookId, barrowed }) {
  const registerLibrary = async (libraryID) => {
    try {
      const response = await axios.get(
        "/api/library/register/" +
          localStorage.getItem("username") +
          "/" +
          +libraryID
      );
      setLibrary(response.data);
      setIsLoaded(true); // Veri alındığında isLoaded state'i true yapılıyor
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{bookname}</div>
        <div className="card-icon">
          <FiBook size={120} />
        </div>
        {barrowed ? (
          <button className="card-button">geri ver</button>
        ) : (
          <button
            className="card-button"
            onClick={() => {
              registerLibrary(bookId);
            }}
          >
            ödünç al
          </button>
        )}
        {barrowed ? (
          <div className="card-footer">
            <div>Ödünç alınma tarihi :{date}</div>
          </div>
        ) : (
          <div className="card-footer">Card stock : {stock}</div>
        )}
      </div>
    </div>
  );
}

export default Card;
