import React from "react";
import './Navbar.scss';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

    const links = [
        {
            path: "/",
            name: "Anasayfa"
        },
        {
            path: "/bookList",
            name: "Kitaplar"
        },
        {
            name: "Ödünç Alınanlar",
            // hover: true,
            path: "/getLoans"
        },
        {
            path: "/user",
            name: "Profil"
        },
        {
            path: "/login",
            name: "Giriş"
        }
    ]

    return (
        <nav className="nav">
            <div className="container nav__container">
                <div className="nav__logo logo">
                    <Link to="/">Library</Link>
                </div>
                <div className="nav__search">
                    <input type="text" placeholder="Ara" />
                </div>
                <ul className="nav__list">
                    {links.map((route, index) => (
                        route.hover ? (
                            <li className="nav__item nav__dropdown-item" key={index}>
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
                            <li className="nav__item" key={index}>
                                <NavLink to={route.path} className="nav__link">
                                    {route.name}
                                </NavLink>
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;