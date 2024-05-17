import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";
import { TreeTable } from "primereact/treetable";
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import toast from "react-hot-toast";
// arrow top 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const updatePenalty = async (id, qr, newPenalty) => {
    try {
      const response = await axios.put(
        `/api/library/updatePenalty/${id}/${qr}?newPenalty=${newPenalty}`
      );
      console.log(response.data);
      toast.success("Ceza başarıyla güncellendi!");
      getUsers(); // Kullanıcı listesini yeniden yükleyin
    } catch (err) {
      console.error(err.message);
      toast.error("Ceza güncellenirken bir hata oluştu!");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      let users = response.data;
      const promises = users.map((user) => getUserLoans(user.id));
      const loans = await Promise.all(promises);

      users = users.map((user, index) => ({
        ...user,
        loans: loans[index],
      }));

      setIsLoaded(true);
      console.log("Users: ", users);
      setUsers(users);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserLoans = async (id) => {
    try {
      const response = await axios.get("/api/library/getLoan/" + id);
      console.log("User ID: " + id + " Loans: ", response.data);
      return response.data;
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const formatUsersForTreeTable = (users) => {
    return users.map((user) => {
      return {
        key: user.id,
        data: {
          id: user.id,
          username: user.username2,
          email: user.email2,
          membershipType: user.membershipType,
          membershipDate: formatDate(user.membershipDate),
        },
        children: user.loans.map((loan) => {
          return {
            key: user.id + "/" + loan.book.qr,
            data: {
              id: loan.id,
              qr: loan.book.qr,
              bookName: loan.book.bookDetails.name,
              issueDate: formatDate(loan.loanDate),
              returnDate: formatDate(loan.returnDate),
              penalty: loan.penalty || 0,
            },
          };
        }),
      };
    });
  };


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };


  const handleUpdateClick = (userId, qr) => {
    const newPenalty = document.querySelector(".penalty-update input").value;
    updatePenalty(userId, qr, newPenalty);
  };

  return (
    <div className="admin-container container">
      <main>
        <section id="dashboard" className="admin-section">
          <h2>Admin Paneline Hoşgeldiniz</h2>
          <p>
            Buradan uygulama ayarlarınızı ve kullanıcılarınızı yönetebilirsiniz.
          </p>
        </section>
        <section id="users" className="admin-section">
          <h2>Kullanıcılar</h2>
          {isLoaded ? (
            <TreeTable value={formatUsersForTreeTable(users)} selectionMode="single">
              <Column field="username" header="Kullanıcı Adı" expander></Column>
              <Column field="email" header="E-posta" style={{ width: "16rem" }}></Column>
              <Column field="membershipType" header="Üyelik Türü"></Column>
              <Column field="membershipDate" header="Üyelik Tarihi"></Column>
              <Column field="bookName" header="Kitap Adı"></Column>
              <Column field="issueDate" header="Ödünç Tarihi"></Column>
              <Column field="returnDate" header="Teslim Tarihi"></Column>
              <Column
                field="penalty"
                header="Ceza (TL)"
                body={(rowData) => (
                  rowData.data.penalty !== undefined ? (
                    <div className="penalty-update">
                      <input
                        type="number"
                        defaultValue={rowData.data.penalty}
                      />
                      <Button
                        label={<FontAwesomeIcon icon={faArrowUp} />}
                        style={{ color: "black" }}
                        onClick={() => handleUpdateClick(rowData.key.split("/")[0], rowData.key.split("/")[1])}
                      />
                    </div>

                  ) : (
                    <span>{rowData.data.penalty}</span>
                  )
                )}
              ></Column>
            </TreeTable>

          ) : (
            <p>Yükleniyor...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
