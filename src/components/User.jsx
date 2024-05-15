import axios from "axios";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState([]);
  const [loans, setLoans] = useState([]);

  const getUser = async () => {
    try {
      const tes = await axios.get("/api/test", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(tes.data);
      console.log(tes.data);
      localStorage.setItem("username", tes.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const getLoans = async () => {
    try {
      const response = await axios.get("/api/library/getLoan/" + localStorage.getItem("username"));
      setLoans(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUser();
    getLoans();
  }, []);

  return (
    <div className="user-container">
      <p className="user-email">{user && user.email2}</p>

      {loans.map((loan) => (
        <div className="loan-item" key={loan.book.qr}>
          <h2 className="loan-book-name">{loan.book.bookDetails.name}</h2>
          <ul className="loan-info-list">
            <li className="loan-info-item">
              Ödünç Alma Tarihi: <span className="loan-date">{loan.loanDate}</span>
            </li>
            <li className="loan-info-item">
              Tahmini Veriş Zamanı: <span className="loan-date">{loan.returnDate}</span>
            </li>
            <li className="loan-info-item">
              Ceza:{" "}
              <span className="loan-penalty">
                {loan.penalty <= 0 && "cezanız yoktur"} {loan.penalty > 0 && `Cezınız ${loan.penalty} lütfen en kısa sürede ödeyiniz`}
              </span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
