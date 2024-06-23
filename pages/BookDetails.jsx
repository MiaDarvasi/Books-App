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
        <section className="car-details">
            <h1>{book.title}</h1>
            <h3>Book ID: {book.id}</h3>
            <p>Price: {book.listPrice.amount}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}