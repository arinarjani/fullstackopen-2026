import { useState, useImperativeHandle } from 'react'

const Togglable = ( props ) => {
    const [visible, setVisible] = useState(true)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(props.ref, () => {
        return { toggleVisible }
    })

    return (
        <div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div style={hideWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable