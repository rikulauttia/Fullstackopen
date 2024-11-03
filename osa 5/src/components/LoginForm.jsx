import { useState } from 'react';

const LoginForm = ({login, errorMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (event) => {
        event.preventDefault()
        login({
            username: username,
            password: password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            {errorMessage && errorMessage}
            <form>
                <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button onClick={loginUser} type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm