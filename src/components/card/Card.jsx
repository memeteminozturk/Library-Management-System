import React, { useState, useEffect} from "react";
import axios from "axios";
import "./card.css";
import { FiBook } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Card({ bookname, stock, author, date, bookId, barrowed, penalty, cardClick = true, qr, libraryID }) {

  const [library, setLibrary] = useState([]);
  const [loans, setLoans] = useState([]);
  const [books, setBook] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const getLoans = async (callback) => {
    try {
      const response = await axios.get("/api/library/getLoan/ " + user.id);
      console.log(response.data);
      setLoans(response.data);
      callback && callback();
    } catch (err) {
      console.error(err.message);
    }
  };

  const addLoan = async (bookItem) => {
    getLoans();

    try {
      const loanIsbns = loans.map((loan) => loan.isbn);
      if (loanIsbns.includes(bookItem?.bookDetails?.isbn)) {
        toast.error("Bu kitabı zaten ödünç aldınız.");  
        return;
      }

      const response = await axios.get("/api/library/" + user.id + "/" + bookItem.qr);
      console.log(response.data);
      toast.success("Kitap ödünç alındı.");

      getLoans(getBooks());
    } catch (err) {
      console.error(err.message);
      toast.error("Kitap ödünç alınamadı.\n" + err.message);
    }
  };

  const setBarrowed = (books, loans) => {
    debugger
    const loanIsbns = loans.map((loan) => loan.isbn);
    return books.map((book) => {
      if (loanIsbns.includes(book.isbn)) {
        return { ...book, barrowed: true };
      } else {
        return { ...book, barrowed: false };
      }
    });
  }


  const getBooks = async () => {
    try {
      const response = await axios.get("/api/library/getBooks/" + libraryID);
      setBook(response.data);
      setBarrowed(response.data, loans);
      setIsLoaded(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const navigateBookDetail = (bookId) => {
    navigate(`/bookDetail/${bookId}`);
  };

  useEffect(() => {
    getLoans(getBooks());
  }, []);

  return (
    <div className="card" onClick={cardClick ? () => navigateBookDetail(bookId) : null}>
      <div className="card-body">
        <div className="card-title">{bookname}</div>
        <div className="card-icon">
          <FiBook size={120} />
        </div>
        {barrowed || books?.find((book) => book.isbn === bookId)?.barrowed ? (
          <button className="card-button" disabled>
            Ödünç al
          </button>
        ) : (
          <button
            className="card-button"
            onClick={(e) => {
              e.stopPropagation();
              addLoan({ bookDetails: { isbn: bookId }, qr: qr });
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
