
export function BookList({ books, onRemoveBook, onSelectBookId }) {

    return (
        <ul className="book-list clean-list">
            {books.map(book =>
                <li key={book.id}>
                    <h1>{book.title}</h1>
                    <h2>Price: {book.listPrice.amount}</h2>
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}