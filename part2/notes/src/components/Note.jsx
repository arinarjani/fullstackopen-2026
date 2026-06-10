const Note = ( {note, toggleImportance} ) => {
 let { content } = note;
  const label = note.important ? 'make not important' : 'make important' 

  return (
    <>
      <li className='note'>{content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    </>
  )
}

export default Note