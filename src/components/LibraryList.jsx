import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./card/Card";
import { useSelector } from "react-redux";
import Slider from "./Slider";

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
    getLibrary();
  }, []);

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
    <div className="library">
      <Slider />
      <div className="container">
        <div className="library-content">
          <h1 className="library-title">Kayıtlı Kütüphanelerimiz</h1>
          <ul className="library-list">
            {isLoaded &&
              library.map((item) => (
                <li
                  className="library-item"
                  key={item.libraryID}
                  onClick={() => navigateBookList(item.libraryID)}
                >
                  <span>
                    <h2>{item.name}</h2>
                    <p>{item.address}</p>
                  </span>
                  <button
                    onClick={() => {
                      registerLibrary(item.libraryID);
                    }}
                    className="register-library-btn"
                  >
                    Giriş Yap
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LibraryList;
