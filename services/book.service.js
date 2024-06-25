import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'books'
var gFilterBy = { title: '', price: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    saveReview,
    removeReview,
    getEmptyReview,
    getFilterFromSearchParams,
    getCtgsStats,
    capitalize
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.listPrice.amount >= gFilterBy.price)
            }
            // console.log(gFilterBy)
            // console.log(books)

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

function getEmptyBook(title = '', listPrice = {}, categories = []) {
    return {
        id: '',
        title,
        listPrice,
        categories,
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        reviews: []
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
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
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `./assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
                reviews: []
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)

    }
}

function saveReview(bookId, reviewToSave) {
    return get(bookId).then(book => {
        const review = _createReview(reviewToSave)
        book.reviews.unshift(review)
        // console.log(book.reviews)
        return save(book).then(() => review)
    })
}

function getEmptyReview() {
    return {
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    }
}

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        const newReviews = book.reviews.filter((review) => review.id !== reviewId)
        book.reviews = newReviews
        return save(book)
    })
}

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}

function getFilterFromSearchParams(searchParams) {
    // return Object.fromEntries(searchParams)
    const title = searchParams.get('title') || ''
    const price = searchParams.get('price') || ''
    return {
        title,
        price
    }
}

function capitalize(str) {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase()
}

function getCtgsStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCtgMap = _getBookCountByCtgMap(books)
            const data = Object.keys(bookCountByCtgMap).map(ctg => ({ title: ctg, value: bookCountByCtgMap[ctg] }))
            return data
        })
}

function _getBookCountByCtgMap(books) {
    const categoryCounts = {};

    books.forEach(book => {
        book.categories.forEach(category => {
            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        });
    });

    console.log(categoryCounts)

    return categoryCounts;
}