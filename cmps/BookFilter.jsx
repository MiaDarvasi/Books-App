
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

        console.log('filterByToEdit', filterByToEdit)

    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, price } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Search tools</h2>
            <form onSubmit={onSubmitFilter}>
                <section className="title-input">
                <label htmlFor="title">Title:</label>
                <input value={title || ''} onChange={handleChange} name="title" type="text" id="title" />
                </section>
                <section className="price-input">
                <label htmlFor="price">Price:</label>
                <input value={price || ''} onChange={handleChange} name="price" type="number" id="price" />
                </section>

            </form>
        </section>
    )
}
