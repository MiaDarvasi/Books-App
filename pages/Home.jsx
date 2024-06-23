const { useState } = React

export function Home() {

    const [page, setPage] = useState('home')

    return (
        <section className="home">
            {page === 'home' &&
             <React.Fragment>
                 <h1>Welcome to the Book App</h1>
                 <h2>Review and update<br></br> &emsp; &emsp; all your favorite books...</h2>
                 <button onClick={() => setPage('books')}>Get started</button>
             </React.Fragment>
            }
        </section>
    )
}
