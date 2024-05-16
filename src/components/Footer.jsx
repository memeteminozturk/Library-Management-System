import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="logo">
                        <Link to="/">library</Link>
                    </div>
                    <div className="footer-nav list-group">
                        <h3 className='list-title'>Menü</h3>
                        <ul>
                            <li><a href="/">Anasayfa</a></li>
                            <li><a href="/bookList">Kitaplar</a></li>
                            <li><a href="/getLoans">Ödünç Alınanlar</a></li>
                            <li><a href="/user">Profil</a></li>
                            <li><a href="/login">Giriş</a></li>
                        </ul>
                    </div>
                    <div className="credentials list-group">
                        <h3 className='list-title'>Created by</h3>
                        <ul>
                            <li>Numan Söcü</li>
                            <li>Canay Yüceyurt</li>
                            <li>Emirhan Akkuş</li>
                            <li>Anıl Tan</li>
                            <li>Memet Emin Öztürk</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Library. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    )
}


export default Footer