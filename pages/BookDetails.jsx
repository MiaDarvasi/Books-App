const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";

export function BookDetails({ onBack }) {

    const [book, setBook] = useState(null)
    const [isShowReviewModal, setIsShowReviewModal] = useState(null)

    const { bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [bookId])



    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        bookService.saveReview(book.id, reviewToAdd)
        .then((review => {
            setBook(prevBook => {
                const reviews = [review, ...prevBook.reviews]
                    return { ...prevBook, reviews }
                })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
    }


    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>Author: {book.authors}</h2>
            <img src={book.thumbnail} />
            <h3>Book ID: {book.id}</h3>
            <h4>Published: {book.publishedDate}</h4>
            <p className="price">Price: {book.listPrice.amount}$</p>
            <p>Pages: {book.pageCount}</p>
            <button ><Link to="/books">Back</Link></button>
            <button onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    saveReview={onSaveReview}
                />
            )}
            <div className='review-container'>
                <ReviewList reviews={book.reviews || []} onRemoveReview={onRemoveReview} />
            </div>
        </section>
    )
}