import axios from "axios";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Card from "./card/Card";

function GetLoans() {
  const [loans, setLoans] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.user.user);
  const getLoans = async () => {
    try {
      const response = await axios.get("/api/library/getLoan/ " + user.id);
      setLoans(response.data);
      setIsLoaded(true);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <section className="booklist">
      <div className="container booklist-container">
        <div className="booklist-header">
          <h1>Ödünç Alınan Kitaplar ({loans.length})</h1>
        </div>
        <div className="booklist-content">
          {isLoaded ? (
            loans.map((bookItem, index) => (
              <Card
                bookname={bookItem.book.bookDetails.name}
                stock={bookItem.stock}
                bookId={bookItem.book.isbn}
                key={index}
                barrowed={true}
                date={bookItem.returnDate}
                penalty={bookItem.penalty}
                cardClick={false}
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

export default GetLoans;
