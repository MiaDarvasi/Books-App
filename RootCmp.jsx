const { useState } = React

const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AppHeader } from './cmps/AppHeader.jsx'


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/books" element={<BookIndex />} />
                        <Route path="/books/:bookId" element={<BookDetails />} />
                        <Route path="/books/edit" element={<BookEdit />} />
                        {/* <Route path="/books/edit/:bookId" element={<BookEdit />} /> */}

                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </main>
                {/* <UserMsg /> */}
                <footer>
                    <h1>Book App</h1>
                    <p>All rights reserved 2024</p>
                </footer>
            </section>
        </Router>
    )
} 