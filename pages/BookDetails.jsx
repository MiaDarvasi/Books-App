import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ onBack, bookId }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])

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
            <button onClick={onBack}>Back</button>
        </section>
    )
}