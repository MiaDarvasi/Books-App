const { Link } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {

    let readLvl
    if (book.pageCount < 100) {
        readLvl = 'Light Reading'
    } else if (book.pageCount > 200) {
        readLvl = 'Decent Reading'
    } else if (book.pageCount > 500) {
        readLvl = 'Serious Reading'
    } else {
        readLvl = ''
    }

    let bookStatus
    if (book.publishedDate > 2022) {
        bookStatus = 'New'
    } else if (book.publishedDate < 2004) {
        bookStatus = 'Vintage'
    }

    const onSale = (book.listPrice.isOnSale)? 'on-sale' : ''

    return (
        <li className={onSale} key={book.id}>
            <p className="book-status">{bookStatus}</p>
            <h1>{book.title}</h1>
            <img src={book.thumbnail} />
            <h2>Price: {book.listPrice.amount}$</h2>
            <p>{readLvl}</p>
            <section>
                <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                <button><Link to={`/books/${book.id}`}>Details</Link></button>
            </section>
        </li>
    )
}