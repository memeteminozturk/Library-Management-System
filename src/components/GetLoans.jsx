import axios from "axios";
import { useState } from "react";

function GetLoans() {
  const [loans, setLoans] = useState([]);
  const getLoans = async () => {
    try {
      const response = await axios.get("/api/library/loans/1");
      console.log("basıldı");
      setLoans(response.data);
      console.log(loans);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button onClick={getLoans}>GetLoans</button>

      {/* {loans.map((loan, index) => (
        <div key={index}>
          <h2>{loan.book.title}</h2>
        </div>
      ))} */}

      {loans && loans.map((loan) => <div key={loan.isbn}>{loan.name}</div>)}
    </div>
  );
}

export default GetLoans;
