const Course = ({ course }) => {
  let {name, parts} = course

  return (
    <div>
      <Header courseTitle={name} />
      {
        parts.map(part => <Content key={part.id} name={part.name} exercise={part.exercises} />)
      }
      <Total totalExercises={parts} />
    </div>
  )
}

const Header = ( { courseTitle } ) => {
  return (
    <h2>{courseTitle}</h2>
  )
}

const Content = ( { name, exercise } ) => {
  return (
    <Part name={name} exercise={exercise} />
  )
}

const Part = ( { name, exercise } ) => {
  return (
    <p>{name} {exercise}</p>
  )
}

const Total = ( { totalExercises } ) => {
  let sumAllExercises = totalExercises.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

  return (
    <p>Number of exercises: {sumAllExercises}</p>
  )
}

export default Course