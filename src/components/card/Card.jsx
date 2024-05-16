import React, { useState } from "react";
import axios from "axios";
import "./card.css";
import { FiBook } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Card({ bookname, stock, author, date, bookId, barrowed, penalty, cardClick }) {

  const [library, setLibrary] = useState([]);
  const [loans, setLoans] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

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
      toast.error(error);
    }
  };

  const getLoans = async () => {
    try {
      const response = await axios.get("/api/library/loans/" + localStorage.getItem("username"));
      setLoans(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addLoan = async (bookItem) => {
    getLoans();

    try {
      const loanIsbns = loans.map((loan) => loan.isbn);

      if (loanIsbns.includes(bookItem.bookDetails.isbn)) {
        toast.error("Bu kitabı zaten ödünç aldınız.");  
      } else {
        toast.error("Eşleşen herhangi bir ISBN değeri bulunamadı.");
      }

      const response = await axios.get("/api/library/" + localStorage.getItem("username") + "/" + bookItem.qr);
      console.log(response.data);

      getLoans();
      getBooks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const navigateBookDetail = (bookId) => {
    navigate(`/bookDetail/${bookId}`);
  };

  return (
    <div className="card" onClick={cardClick ? () => navigateBookDetail(bookId) : null}>
      <div className="card-body">
        <div className="card-title">{bookname}</div>
        <div className="card-icon">
          <FiBook size={120} />
        </div>
        {barrowed ? (
          <button className="card-button">İade et</button>
        ) : (
          <button
            className="card-button"
            onClick={(e) => {
              e.stopPropagation();
              addLoan(bookId);
            }}
          >
            Ödünç al
          </button>
        )}
        {barrowed ? (
          <div className="card-footer">
            <div>Ceza: {penalty}TL</div>
            <div>Teslim tarihi: {date}</div>
          </div>
        ) : (
          <div className="card-footer">Stok: {stock}</div>
        )}
      </div>
    </div>
  );
}

export default Card;
