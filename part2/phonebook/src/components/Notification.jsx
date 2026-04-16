const Notification = ( {message} ) => {
    console.log('message: ', message)

    if (message === null) {return}

    return (
        <div className={`notification ${'green'}`}>
            <p>{message}</p>
        </div>
    )
}

export default Notification