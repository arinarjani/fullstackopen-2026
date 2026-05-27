const Login = ({data}) => {
    const { handleLogin, username, password, setUsername, setPassword } = data
    return (
        <form onSubmit={handleLogin}>
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