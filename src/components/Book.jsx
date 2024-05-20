import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./card/Card";
import toast from "react-hot-toast";

function Book() {
  const [book, setBook] = useState([]);
  const [loans, setLoans] = useState([]);
  const [library, setLibrary] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id = 1 } = useParams();

  const [author, setAuthor] = useState("");

  const getLibraryById = async (id) => {
    try {
      const response = await axios.get("/api/library/getLibrary/" + id);
      setLibrary(response.data);
      return response.data;
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const addLoan = async (bookItem) => {
    getLoans();
    try {
      const loanIsbns = loans.map((loan) => loan.isbn);

      if (loanIsbns.includes(bookItem.bookDetails.isbn)) {
        toast.error("Bu kitabı zaten ödünç aldınız.");
      } else {
        toast.error("Eşleşen herhangi bir ISBN değeri bulunamadı.");
      }

      getLoans();
      getBooks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.get("/api/library/getBooks/" + id);
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
    getLibraryById(id);
    getBooks();
    getLoans();
  }, []);


  return (
    <section className="booklist">
      <div className="container booklist-container">
        <div className="booklist-header">
          <h1>Kitaplar ({book.length})</h1>
          <h2>{library.name}</h2>
        </div>
        <div className="booklist-content">
          {isLoaded ? (
            book.map((bookItem, index) => (
              <Card
                bookname={bookItem.bookDetails.name}
                stock={bookItem.bookDetails.stock}
                bookId={bookItem.bookDetails.isbn}
                key={index}
                cardClick={true}
                qr={bookItem.qr}
                libraryID={library.libraryID}
              />
            ))
          ) : (
            <p>Yükleniyor...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Book;
