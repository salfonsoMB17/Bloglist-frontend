import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <li>
      <Link to={`/blogs/${blog.id}`} className="blog-title">{blog.title}</Link>
    </li>
  )
}

export default Blog