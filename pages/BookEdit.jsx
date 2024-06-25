const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { showSuccessMsg } from "../services/event-bus.service.js";
import { bookService } from "../services/book.service.js";


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/books')
                showSuccessMsg(`Book added successfully!`)
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (field) {
            case "title":
                value = target.value
                break
            case "price":
                value = +target.value || ""
                break
            case "categories":
                value = target.value.split(',').map((ctg) => bookService.capitalize(ctg))
                break
        }
        if (field === 'amount') {
            setBookToEdit(prevBook => ({
                ...prevBook, listPrice:
                    { ...prevBook.listPrice, amount: value }
            }))
        } else if (field === 'categories') {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        } else setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }


    const { title, categories, listPrice } = bookToEdit
    const { amount } = listPrice

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <label htmlFor="ctgs">Categories:</label>
                <input onChange={handleChange} value={categories} type="select" name="categories" id="categories" />

                <button>Save</button>
            </form>

        </section>
    )

}