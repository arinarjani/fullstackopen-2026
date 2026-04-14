const PersonForm = ({ name, number, nameChange, numberChange, updatePhonebook }) => {
    return (
        <form onSubmit={updatePhonebook}>
            <div>
            <label htmlFor="name">Name</label>
            <input name="name" value={name} onChange={nameChange} />
            </div>
            <div>
            <label htmlFor="number">Number</label>
            <input name="number" value={number} onChange={numberChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm