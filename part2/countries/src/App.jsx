import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [allCountires, setAllCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [returnedSearch, setReturnedSearch] = useState(null)

  // console.log('returnedSearch: ', returnedSearch[0].name)

  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {

    console.log('starting useEffect')

    axios.get(`${url}`).then(response => {
      setAllCountries(response.data)
      console.log('allCountries has been set')
    }).catch(err => {
      console.log('error: ', err)
    })

  }, [])
  console.log('useEffect finished')

  const handleSearch = (e) => {
    setSearch(e.target.value)

    

    // setReturnedSearch(allCountires.filter(c => c.name.common.toLowerCase() === 'palestine'))

    // console.log('returnedSearch - ', returnedSearch)

    // console.log(`results for ${search}: `, allCountires.filter(c => {
    //   c.name.common.toLowerCase() === search.toLowerCase()
    // }))
  }

  if (allCountires !== null ) {
    
    console.log(allCountires.filter(c => c.name.common.toLowerCase() === 'switzerland'))

    // allCountires.map(c => {
    //   console.log(c.name.common.toLowerCase() === 'palestine')
    // })
    // console.log(allCountires[21].name.common.toLowerCase())
  }

  return (
    <>
    {
      allCountires === null ? 'loading api data...' : 
      <form>
        <div>
          <label htmlFor="country">find countries</label>
          <input type="text" name="country" value={search} onChange={handleSearch} />
        </div>
      </form>
    }
    {
      search !== '' ?
        // allCountires.filter(c => c.name.common.toLowerCase() === search.toLowerCase()).map(name => <p>{name.name.common}</p>)
        allCountires.filter(c => c.name.common.toLowerCase() === search.toLowerCase()).map(c => (
        <>
          <h1>{c.name.common}</h1>
          <p>Capital(s): {c.capital.map(c => c)}</p>
          <p>Area: {c.area}</p>
          <h2>Languages</h2>
          <ul>
            {
              Object.entries(c.languages).map(([key, value]) => <li>{`${value}`}</li>)
            }
          </ul>
          <img src={c.flags.png} alt="The flag of Switzerland is square shaped. It features a white Swiss cross centered on a red field." />
        </>
      ))
        // returnedSearch.map(name => <p>{name.name.common}</p>)
      : 
      <p>search results here</p>
    }
    </>
  )
}

export default App
