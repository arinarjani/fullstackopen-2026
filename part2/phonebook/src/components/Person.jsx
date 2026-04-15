const Person = ( {name, number, button} ) => {
    return (
        <>
            <p>{name} {number} <button onClick={button}>delete</button></p>
        </>
    )
}

export default Person