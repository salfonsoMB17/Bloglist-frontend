import { useState } from 'react'

const Blog = ({ updateBlog, removeBlog, blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    updateBlog(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author"> {blog.author}</span>
        <button className='toggle-button' onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p className="blog-url">{blog.url}</p>
        <p className="blog-likes">{blog.likes} likes <button className="like-button" onClick={handleLike}>like</button></p>
        <p>added by {blog.user.name}</p>
        {blog.user.name === user.name && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog