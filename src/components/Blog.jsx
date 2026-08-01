import { useState } from 'react'

const Blog = ({ updateBlog, blog }) => {
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

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  </div>
  )
}

export default Blog