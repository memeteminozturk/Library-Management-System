import axios from "axios";
import { useState } from "react";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [userId, setUserID] = useState(1); //userId sayfalar arsında taşınmalı bu userın id si ile ödünç alıdğı kitaplar listelenmeli
  const getLoans = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/library/loans/" + userId);
      setLoans(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <div></div>;
}

export default Loans;
