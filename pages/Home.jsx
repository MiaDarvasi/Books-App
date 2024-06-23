export function Home({onGetStarted}) {

    return (
        <section className="home">
            <h1>Welcome to the Book App</h1>
            <h2>Review and update<br></br> &emsp; &emsp; all your favorite books...</h2>
            <button onClick={onGetStarted}>Get started</button>
        </section>
    )
}
