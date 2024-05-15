import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Book() {
  const [book, setBook] = useState([]);
  const [loans, setLoans] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const libraryId = useParams().id;

  const [author, setAuthor] = useState("");

  const addLoan = async (bookItem) => {
    getLoans();
    console.log("loans");

    try {
      const loanIsbns = loans.map((loan) => loan.isbn);
      console.log(loanIsbns);

      if (loanIsbns.includes(bookItem.bookDetails.isbn)) {
        console.log("Aynı ISBN değerine sahip bir kitap var.");
        alert("bir ktap bir kez ödünç alınablir");
      } else {
        console.log("Herhangi bir eşleşen ISBN değeri bulunamadı.");
      }

      const response = await axios.get("/api/library/" + localStorage.getItem("username") + "/" + bookItem.qr);
      console.log(response.data);

      getLoans();
      getBooks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.get("/api/library/getBooks/" + libraryId);
      setBook(response.data);
      setIsLoaded(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getLoans = async () => {
    try {
      const response = await axios.get("/api/library/loans/" + localStorage.getItem("username"));
      setLoans(response.data);
      console.log("loan");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAuthor = async (isbn) => {
    try {
      const author = await axios.get("/api/library/getAuthor/" + isbn);
      console.log(author.data.map((author) => author.author.name));
      setAuthor(author.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBooks();
    getLoans();
  }, []);

  return (
    <div>
      <h1>{libraryId} numaraları Kütüphanedeki kitaplar</h1>
      <ul className="book-list">
        {isLoaded &&
          book.map((bookItem, index) => (
            <li className="book-item" key={index}>
              <div>
                <span>Kitap Adı: {bookItem.bookDetails.name}</span>
                <div id={`details${index}`} className="hidden">
                  <span>ISBN: {bookItem.bookDetails.isbn}</span>
                  <span>Tür: {bookItem.bookDetails.type}</span>
                  <span>Basım Yılı: {bookItem.bookDetails.editionNo}</span>
                  <span>Stok: {bookItem.bookDetails.stock}</span>
                  <span>Yayıncı: {bookItem.bookDetails.publisher.name}</span>
                </div>
              </div>
              <div>
                <button onClick={() => addLoan(bookItem)}>Ödünç Al</button>
                <button
                  onClick={() => {
                    getAuthor(bookItem.bookDetails.isbn), document.getElementById(`details${index}`).classList.toggle("hidden");
                  }}
                >
                  Kitap Ayrıntıları
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Book;
