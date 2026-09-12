import { useState } from 'react'
import { TextField, Button, Container, Typography } from '@mui/material'

const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await handleLogin(username, password)
            setUsername('')
            setPassword('')
        } catch {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <Container>
            <div>
                <h2>Log in to application</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>                
                        <TextField
                            variant="standard"
                            label="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>                
                        <TextField
                            variant="standard"
                            label="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>login</Button>
                </form>
            </div>
        </Container>
    )
}
export default LoginForm