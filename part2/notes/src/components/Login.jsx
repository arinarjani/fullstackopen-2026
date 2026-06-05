import { useState } from "react"

const Login = ({data}) => {
    const { handleLogin } = data

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        // prevent site from refreshing after form submit
        e.preventDefault()

        // send data to function in App to handle login
        handleLogin(username, password)

        // clear username and password fields after submitting
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={login}>
            <div>
            <label>
                username
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            </div>
            <div>
            <label>
                password
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default Login