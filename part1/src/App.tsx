const Header = ( { course } ) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ( { name, exercise } ) => {
  return (
    <>
      <Part name={name} exercise={exercise} />
    </>
  )
}

const Part = ( { name, exercise } ) => {
  return (
    <>  
      <p>{name} {exercise}</p>
    </>
  )
}

const Total = ( { totalExercises } ) => {
  let sumAllExercises = totalExercises.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

  return (
    <>
      <p>Number of exercises: {sumAllExercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />  
      {
        course.parts.map((part, index) => 
          <Content key={index} name={part.name} exercise={part.exercises} />
        )
      }
      <Total totalExercises={course.parts} />
    </div>
  )
}

export default App
