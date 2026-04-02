const Hello = ( {name, age} ) => {
  return (
    <>
      <p>hello {name} are you {age}</p>
    </>
  )
}

function App() {
  const name = 'eric'
  const age = 25

  return (
    <>
      <p>hello world</p>
      <Hello name={'arin'} age={24} />
      <Hello name={'aiden'} age={36} />
      <Hello name={name} age={age} />
    </>
  )
}

export default App
