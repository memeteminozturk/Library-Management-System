import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function Loans() {
  const [loans, setLoans] = useState([]);
  const user = useSelector((state) => state.user.user);
  const getLoans = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/library/loans/" + user.id);
      setLoans(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <div></div>;
}

export default Loans;
