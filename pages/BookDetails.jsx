const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"

export function BookDetails({ onBack }) {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [bookId])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h2>Author: {book.authors}</h2>
            <img src={book.thumbnail}/>
            <h3>Book ID: {book.id}</h3>
            <h4>Published: {book.publishedDate}</h4>
            <p>Price: {book.listPrice.amount}$</p>
            <p>Pages: {book.pageCount}</p>
            <button ><Link to="/books">Back</Link></button>
        </section>
    )
}