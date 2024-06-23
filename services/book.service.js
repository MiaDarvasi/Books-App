import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'books'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.minSpeed) {
                books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = {}) {
    return { id: '', title, listPrice }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Harry Potter', {'amount': 109, 'currencyCode': 'EUR', isOnSale: false}))
        books.push(_createBook('Oliver Twist', {'amount': 175, 'currencyCode': 'EUR', isOnSale: false}))
        books.push(_createBook('World Atlas', {'amount': 89, 'currencyCode': 'EUR', isOnSale: false}))
        books.push(_createBook('The Alchemist', {'amount': 243, 'currencyCode': 'EUR', isOnSale: false}))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title = '', listPrice = {}) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}