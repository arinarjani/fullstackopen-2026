const Note = ( {note, toggleImportance} ) => {
 let { content } = note;
  const label = note.important ? 'make not important' : 'make important' 

  return (
    <>
      <li className='note'>
        <span>{content}</span>
        <button onClick={toggleImportance}>{label}</button>
      </li>
    </>
  )
}

export default Note