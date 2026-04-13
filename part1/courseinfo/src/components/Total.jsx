const Total = ( { totalExercises } ) => {
  let sumAllExercises = totalExercises.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

  return (
    <>
      <p>Number of exercises: {sumAllExercises}</p>
    </>
  )
}

export default Total