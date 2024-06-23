import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

const { useState } = React


export function App() {

    const [page, setPage] = useState('home')

    function onGetStarted() {
        setPage('books')
    }

    return (
        <section className="app">
            <header className="app-header">
                <h1>Book App</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('books')} href="#">Books</a>
                </nav>
            </header>
            <main className="container">
                {page === 'home' && <Home onGetStarted={onGetStarted} />}
                {page === 'about' && <About />}
                {page === 'books' && <BookIndex />}
            </main>
            <footer>
                <h1>Book App</h1>
                <p>All rights reserved 2024</p>
            </footer>
        </section>
    )
}