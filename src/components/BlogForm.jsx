import { useState } from 'react'
import { TextField, Button, Container, Typography } from '@mui/material'  

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Container>
      <div>
        <Typography variant="h4" sx={{ mt: 3 }}>Create new</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="title:"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            sx={{ width: 600, mb: 2 }} />
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="author:"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            sx={{ width: 600, mb: 2 }} />
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              label="url:"
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            sx={{ width: 600, mb: 2 }} />
          </div>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>create</Button>
        </form>
      </div>
    </Container>
  )
}
export default BlogForm