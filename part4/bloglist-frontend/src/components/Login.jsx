const Login = ({ loginFormData }) => {
    const { handleLogin, username, password, setPassword, setUsername } = loginFormData

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">
                username
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label htmlFor="password">
                password
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">login</button>
        </form>
    )
}

export default Login