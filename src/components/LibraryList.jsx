import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./card/Card";
import { useSelector } from "react-redux";

function LibraryList() {
  const [library, setLibrary] = useState([]);
  const [updatedLibrary, setUpdatedLibrary] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchInputValue = useSelector((state) => state.user.searchInput);
  const navigate = useNavigate();

  const getLibrary = async () => {
    try {
      const response = await axios.get("/api/library/getAllLibrary");
      setLibrary(response.data);
      setIsLoaded(true); // Veri alındığında isLoaded state'i true yapılıyor
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const registerLibrary = async (libraryID) => {
    try {
      const response = await axios.get(
        "/api/library/register/" +
          localStorage.getItem("username") +
          "/" +
          +libraryID
      );
      setLibrary(response.data);
      setIsLoaded(true); // Veri alındığında isLoaded state'i true yapılıyor
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateBookList = (libraryID) => {
    navigate(`/bookList/${libraryID}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put("/api/library/updatePenalty/1/1", {
        newPenalty: parseInt(10),
      });

      console.log(response.data);
      // İşlem başarılıysa gerekli işlemler burada yapılabilir
    } catch (error) {
      console.error("Bir hata oluştu:", error);
      // Hata durumunda kullanıcıya uygun geri bildirim yapılabilir
    }
  };
  useEffect(() => {
    // İlk çağrıyı yap
    getLibrary();
  }, []); // useEffect içindeki bağımlılıklar boş olduğunda sadece bir kez çalışacak

  useEffect(() => {
    if (searchInputValue === "") {
      setUpdatedLibrary(library);
    } else {
      setUpdatedLibrary(
        library.filter((item) =>
          item.name.toLowerCase().includes(searchInputValue.toLowerCase())
        )
      );
    }
  }, [searchInputValue]);
  return (
    <div className="library-container">
      {" "}
      {/* Ekle: library-container class'ı */}
      <h1>Sistemdeki Kütüphaneler</h1>
      {/* Ekle: get-library-btn class'ı */}
      <ul className="library-list">
        {" "}
        {/* Ekle: library-list class'ı */}
        {isLoaded &&
          // isLoaded true olduğunda çalışacak
          library.map((item) => (
            <li
              className="library-item"
              key={item.libraryID}
              onClick={() => navigateBookList(item.libraryID)}
            >
              {" "}
              {/* Ekle: library-item class'ı */}
              {item.name}
              <button
                onClick={() => {
                  registerLibrary(item.libraryID);
                }}
                className="register-library-btn" // Ekle: register-library-btn class'ı
              >
                Giriş yap
              </button>
            </li>
          ))}
        <Card bookname={"deneme"} barrowed={true} date={" 10.3000.30"} />
        <Card barrowed={false} />
      </ul>
    </div>
  );
}

export default LibraryList;
