const { NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {

    const navigate = useNavigate()

    return (
        <header className="app-header full main-layout">
                <h1>Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/books">Books</NavLink>
                </nav>
        </header>
    )
}