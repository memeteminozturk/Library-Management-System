import axios from "axios";
import { useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [penalty, setPenalty] = useState([]);

  const [loans, setLoans] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/library/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getLoans = async (id) => {
    try {
      const response = await axios.get("/api/library/getLoan/" + id);
      const loansData = response.data;
      setLoans(loansData);
      console.log(loansData);

      const currentDate = getCurrentDate().split("-").join("");
      console.log(currentDate);

      // Ceza hesaplama işlemleri burada gerçekleştirilebilir
      loansData.forEach((loan) => {
        const returnDate = loan.returnDate.split("-").join("");
        console.log(loan);
        if (currentDate - returnDate > 0) {
          const pen = currentDate - returnDate;

          try {
            const response = axios.put("/api/library/updatePenalty/" + loan.user.id + "/" + loan.book.qr + "?newPenalty=" + pen * pen);
            console.log(response.data);
          } catch (err) {
            console.error(err.message);
          }

          setPenalty(pen * pen);
          console.log("ceza var");
        }
        // Ceza hesaplama işlemleri burada yapılabilir
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Months and days should have leading zero if less than 10
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }
  return (
    <div>
      <div onClick={getUsers}>Kullanıcları göster</div>

      {users.map((user, index) => (
        <div key={index}>
          <h2>{user.username}</h2>
          <h3>{loans && penalty > 0 && penalty}</h3>
          <button onClick={() => getLoans(user.id)}>ceza güncelle</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
