const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'

export function Dashboard() {

    const [books, setBooks] = useState([])
    const [ctgsStats, setCtgsStats] = useState([])

    useEffect(() => {
        bookService.query()
            .then(setBooks)
        bookService.getCtgsStats()
            .then(setCtgsStats)
    }, [])


    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} Books</h2>
            <h4>By Category</h4>
            <Chart data={ctgsStats} />
        </section>
    )
}