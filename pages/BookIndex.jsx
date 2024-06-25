const { Link, useSearchParams } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { bookService } from '../services/book.service.js'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'


export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
        setSearchParams(filterBy)
    }, [filterBy])


    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
                showSuccessMsg(`Book (${bookId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg(`Having problems removing book!`)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
        bookService.setFilterBy({ ...filterBy })
    }


    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <button className="add-book"><Link to="/books/edit">Add Book</Link></button>
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                    />
                </React.Fragment>
            }

            {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}
        </section>
    )


}