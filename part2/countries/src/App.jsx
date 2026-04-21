import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [allCountries, setAllCountries] = useState(null)
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

    setReturnedSearch(allCountries.filter(c => c.name.common.toLowerCase() === e.target.value.toLowerCase()))

    console.log('search term: ', search)
    console.log('countries that match search term: ', 
                allCountries.filter(c => c.name.common.toLowerCase() === search.toLowerCase())
    )
    
    // setReturnedSearch(allCountries.filter(c => c.name.common.toLowerCase() === 'palestine'))

    // console.log('returnedSearch - ', returnedSearch)

    // console.log(`results for ${search}: `, allCountries.filter(c => {
    //   c.name.common.toLowerCase() === search.toLowerCase()
    // }))
  }

  // if (allCountries !== null ) {
  //   // log out the country that matches the search term (if there is one)
  //   console.log('search term: ', search)
  //   console.log('countries that match search term: ', 
  //               allCountries.filter(c => c.name.common.toLowerCase() === search.toLowerCase())
  //   )
  // }


    //console.log(allCountries.filter(c => c.name.common.toLowerCase() === 'switzerland'))

    // allCountries.map(c => {
    //   console.log(c.name.common.toLowerCase() === 'palestine')
    // })
    // console.log(allCountries[21].name.common.toLowerCase())

  return (
    <>
    {
      allCountries === null ? 'loading api data...' : 
      <form>
        <div>
          <label htmlFor="country">find countries</label>
          <input type="text" name="country" value={search} onChange={handleSearch} />
        </div>
      </form>
    }
    {
      returnedSearch !== null && returnedSearch.length > 0 ?
        // loop through returnedSearch and show the details of the country if the letters are included in the earch term
        // example: if I search for 'sw' it should show me Switzerland, Sweden, and any other country that 
        // has 'sw' in its name (so I can find the country even if I don't know how to spell it correctly   
        returnedSearch.map(c => (
        <div key={c.name.common}>
          <h1>{c.name.common}</h1>
          <p>Capital(s): {c.capital.map(c => c)}</p>
          <p>Area: {c.area}</p>
          <h2>Languages</h2>
          <ul>
            {
              Object.entries(c.languages).map(([key, value]) => <li>{`${value}`}</li>)
            }
          </ul>
          <img src={c.flags.png} alt={`The flag of ${c.name.common} is ${c.flags.alt}`} />
        </div>
      ))
      : search !== '' ? 'no results found' : 'search results here'
    }
    {/* {
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
    } */}
    </>
  )
}

export default App
