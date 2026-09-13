import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'  

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const padding = {
    paddingRight: 5
  }
  
  const navigate = useNavigate()

  const handleLogin = async (username, password) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    navigate('/')
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification({ text: `Blog '${newBlog.title}' added!`, type: 'success' })
      navigate('/')
    } catch {
      setNotification({ text: 'Error in create new blog', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch {
      setNotification({ text: 'Error in update new blog', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      if (!window.confirm('Do you really want to remove this blog?')) return
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      navigate('/')
    } catch {
      setNotification({ text: 'Error in remove blog', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Blog App</Typography>
          <Button color="inherit" component={Link} style={padding} to="/">BLOGS</Button>
          {user && <Button color="inherit" component={Link} style={padding} to="/create">NEW BLOG</Button>}
          {user
            ? <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
            : <Button color="inherit" component={Link} style={padding} to="/login">LOGIN</Button>
          }
        </Toolbar>
      </AppBar>

      <Notification message={notification} sx={{ mt: 1 }} />

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm handleLogin={handleLogin} />} />
        <Route path="/" element={<Home blogs={blogs} user={user} blogFormRef={blogFormRef} createBlog={createBlog} updateBlog={updateBlog} removeBlog={removeBlog} />} />
        <Route path="/blogs/:id" element={<BlogView blogs={blogs} handleLike={updateBlog} handleRemove={removeBlog} user={user} />} />
        <Route path="/create" element={<BlogForm createBlog={createBlog} />} />
      </Routes>      
    </div>
  )
}

export default App