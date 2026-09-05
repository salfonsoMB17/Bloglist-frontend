
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Home = ({ blogs, user, blogFormRef, createBlog, updateBlog, removeBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      <Togglable ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog updateBlog={updateBlog} removeBlog={removeBlog} key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default Home