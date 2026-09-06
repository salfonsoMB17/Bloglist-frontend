import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, handleLike, handleRemove, user }) => {
    const onLike = () => {
        const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user?.id || blog.user?._id || blog.user }
        handleLike(blog.id, blogToUpdate)
    }

    const { id } = useParams()
    const blog = blogs.find(b => b.id === id)

    if (!blog) return null
    
    return (
        <div style={{ marginTop: 20 }}>
            <strong>{blog.title} {blog.author}</strong>
            <p className="blog-url">{blog.url}</p>
            <p className="blog-likes">{blog.likes} likes <button className="like-button" onClick={onLike}>like</button></p>
            <p>added by {blog.user?.name || blog.user?.username}</p>  
            {blog.user?.name === user?.name && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
    )
}

export default BlogView