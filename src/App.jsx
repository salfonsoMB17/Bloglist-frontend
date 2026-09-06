import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import BlogView from './components/BlogView'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      navigate('/')
    } catch {
      setErrorMessage('Error in create new blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    } catch {
      setErrorMessage('Error in update blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const removeBlog = async (id) => {
    try {
      if (!window.confirm('Do you really want to remove this blog?')) return
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      navigate('/')
    } catch {
      setErrorMessage('Error in remove blog')
      setTimeout(() => setErrorMessage(null), 5000)
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

  /*if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">login</button>
        </form>
      </div>
    )
  }*/

  return (
    <div>
      <nav>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">create new</Link>
        {user
          ? <span>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
          : <Link style={padding} to="/login">login</Link>
        }
      </nav>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm handleLogin={handleLogin} />} />
        <Route path="/" element={<Home blogs={blogs} user={user} blogFormRef={blogFormRef} createBlog={createBlog} updateBlog={updateBlog} removeBlog={removeBlog} />} />
        <Route path="/blogs/:id" element={<BlogView blogs={blogs} handleLike={updateBlog} handleRemove={removeBlog} user={user} />} />
        <Route path="/create" element={<BlogForm createBlog={createBlog} />} />
      </Routes>
    </div>
    /*<div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog updateBlog={updateBlog} removeBlog={removeBlog} key={blog.id} blog={blog} user={user} />
      )}
    </div>*/
  )
}

export default App