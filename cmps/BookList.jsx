import { BookPreview } from '../cmps/BookPreview.jsx'


export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list clean-list">
            {books.map(book =>
                <BookPreview key={book.id} book={book}
                    onRemoveBook={onRemoveBook} />
            )}
        </ul>
    )
}