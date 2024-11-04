import { useState } from 'react'

import PropTypes from 'prop-types'

const LoginForm = ({ login, errorMessage }) => {
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm