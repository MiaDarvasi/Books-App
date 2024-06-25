import { StarRating } from "./StarRating.jsx"
import { TextboxRating } from "./TextboxRating.jsx"

const { useState, useRef, useEffect } = React

export function AddReview({ saveReview, toggleReview }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })

    const [cmpType, setCmpType] = useState('stars')

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        review.date = new Date(date).getTime()
        saveReview(review)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onChangeCmpType(selectedType) {
        setCmpType(selectedType)
    }


    const { fullName, date, txt, rating } = review
    return <section className='review-add'>

        <form onSubmit={onAddReview} className='review-form'>
                <label className='bold-txt' htmlFor='fullname'>Full name:</label>
                <input
                    autoFocus
                    ref={inputRef}
                    placeholder='Enter full name'
                    name='fullName'
                    type='text'
                    id='fullname'
                    value={fullName}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <label className='bold-txt' htmlFor='date'>Date:</label>

                <input
                    type='date'
                    id='date'
                    name='date'
                    value={date}
                    onChange={handleChange}
                />
                <StarRating handleChange={handleChange} rating={rating} />
                <TextboxRating handleChange={handleChange} txt={txt} />
                <button className='btn-toggle-modal'
                    onClick={toggleReview}>Cancel
                </button>
                <button>Save</button>
        </form>

    </section>
}
