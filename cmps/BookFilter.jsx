
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const { name, type } = target
        const value = type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    const { title, price } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Search tools</h2>
            <form>
                <section className="title-input">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title || ''}
                        onChange={handleChange}
                    />
                </section>
                <section className="price-input">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price || ''}
                        onChange={handleChange}
                    />
                </section>

            </form>
        </section>
    )
}
