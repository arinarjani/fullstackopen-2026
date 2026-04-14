const Search = ({ search, handleSearch }) => {
    return (
        <form>
            <div>
            <label htmlFor="search">Search by Name</label>
            <input name="search" type="text" value={search} onChange={handleSearch}/>
            </div>
        </form>
    )
}

export default Search