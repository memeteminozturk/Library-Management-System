import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchInput } from "../redux/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);

  const links = [
    {
      path: "/",
      name: "Anasayfa",
    },
    {
      path: "/bookList",
      name: "Kitaplar",
    },
    {
      name: "Ödünç Alınanlar",
      // hover: true,
      path: "/getLoans",
    },
    {
      path: "/user",
      name: "Profil",
    },
    {
      path: "/login",
      name: "Giriş",
    },
  ];

  useEffect(() => {
    setIsLogged(localStorage.getItem("token") ? true : false);
  }, [location]);


  return (
    <nav className="nav">
      <div className="container nav__container">
        <div className="nav__logo logo">
          <Link to="/">Library</Link>
        </div>
        <div className="nav__search">
          <input
            type="text"
            placeholder="Ara"
            onChange={(e) =>
              dispatch(setSearchInput({ searchInput: e.target.value }))
            }
          />
        </div>
        <ul className="nav__list">
          {links.map((route) =>
            isLogged && route.name === "Giriş" ? null :
            !isLogged && route.name === "Profil" ? null :
            route.hover ? (
              <li className="nav__item nav__dropdown-item" key={route.name}>
                <NavLink to={route.path} className="nav__link">
                  {route.name}
                </NavLink>
                <div className="nav__dropdown">
                  <ul className="nav__dropdown-list">
                    {/* dropdown ihtiyacı için */}
                  </ul>
                </div>
              </li>
            ) : (
              <li className="nav__item" key={route.name}>
                <NavLink to={route.path} className="nav__link">
                  {route.name}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
