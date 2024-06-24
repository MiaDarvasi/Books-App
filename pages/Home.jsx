const { NavLink, useNavigate } = ReactRouterDOM

export function Home({ onGetStarted }) {

    const navigate = useNavigate()

    return (
        <section className="home">
            <h1>Welcome to the Book App</h1>
            <h2>Review and update<br></br> &emsp; &emsp; all your favorite books...</h2>
            <button><NavLink to="/books">Get started</NavLink></button>
        </section>
    )
}
