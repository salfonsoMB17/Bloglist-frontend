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
                <Typography variant="h4" sx={{ mt: 3 }}>Log in to application</Typography>
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
                            sx={{ width: 400, mb: 2 }}
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
                            sx={{ width: 400, mb: 2 }}
                        />
                    </div>
                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>login</Button>
                </form>
            </div>
        </Container>
    )
}
export default LoginForm