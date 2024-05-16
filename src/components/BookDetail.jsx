import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiBook } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BookDetail = () => {

    const [book, setBook] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [rating, setRating] = useState(0)
    const { isbn } = useParams()

    const getBookDetail = async () => {
        try {
            const response = await axios.get("/api/library/book/" + isbn)
            setBook(response.data[0])
            getComments(response.data[0].qr)
            setIsLoaded(true)
        } catch (err) {
            toast.error(err.message)
        }
    }

    const getComments = async (qr) => {
        try {
            const response = await axios.get("/api/library/comments/" + qr)
            response.data.forEach((comment) => {
                comment.date = formatDate(comment.date)
            })
            setComments(response.data)
            setIsLoaded(true)
        } catch (err) {
            toast.error(err.message)
        }
    }

    const formatDate = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleDateString()
    }

    useEffect(() => {
        getBookDetail()
    }, [])

    return (
        <section className="book-detail">
            <div className="container">
                {isLoaded &&
                    <div className="book-detail-content">
                        <div className="book-detail-image">
                            <FiBook size={300} color="#ccc" />
                        </div>
                        <div className="book-detail-info">
                            <h2>{book.bookDetails.name}</h2>
                            <p><span>ISBN:</span> {book.bookDetails.isbn}</p>
                            <p><span>Yazar:</span> {book.bookDetails.author.name} {book.bookDetails.author.surname}</p>
                            <p><span>Yayınevi:</span> {book.bookDetails.publisher.name}</p>
                            <p><span>Tür:</span> {book.bookDetails.type}</p>
                            <p><span>Baskı:</span> {book.bookDetails.editionNo}. Baskı</p>
                            <p><span>Raf No:</span> {book.shelfNo}</p>
                            <p><span>Sıra No:</span> {book.sequenceNo}</p>
                            <p><span>Stok:</span> {book.bookDetails.stock}</p>
                            <button className="book-detail-button">Ödünç Al</button>
                        </div>
                    </div>
                }
                <div className="comments">
                    <h2 className="comments-title">Yorumlar</h2>
                    <div className="comment-form">
                        <form>
                            <div className="form-group">
                                <div className="form-header">
                                    <label htmlFor="comment">Yorumunuz</label>
                                    <div className="rating">
                                        {
                                            [1, 2, 3, 4, 5].map((star) => (
                                                <FontAwesomeIcon key={star} icon={faStar} data-rating={star} data-checked="false" className="comment-star"
                                                onClick={(e) => {
                                                    document.querySelectorAll('.rating .fa-star').forEach((star) => {
                                                        star.style.color = '#ccc'
                                                    })
                                                    for (let i = 0; i < star; i++) {
                                                        document.querySelectorAll('.rating .fa-star')[i].style.color = '#FFD700'
                                                    }

                                                    setRating(star)
                                                }} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <textarea id="comment" name="comment" rows="2" onChange={(e) => setCommentText(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="comment-button">Yorum Yap</button>
                        </form>
                    </div>
                    <ul className="comments-list">
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <div className="comment-user">
                                    <FaUser size={40} color="#ccc" />
                                </div>
                                <div className="comment-content">
                                    <div className="comment-info">
                                        <div className='comment-detail'>
                                            <p>{comment.user.username}</p>
                                            <div className="comment-rating">
                                                <FontAwesomeIcon icon={faStar} color="#FFD700" />
                                                <p>{comment.rating}</p>
                                            </div>
                                        </div>
                                        <p className='comment-date'>{comment.date}</p>
                                    </div>
                                    <p className='comment-text'>{comment.comment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </section>
    )
}

export default BookDetail