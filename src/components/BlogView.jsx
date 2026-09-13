import { useParams } from 'react-router-dom'
import { Card, CardContent, Typography, Button } from '@mui/material'

const BlogView = ({ blogs, handleLike, handleRemove, user }) => {
    const onLike = () => {
        const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user?.id || blog.user?._id || blog.user }
        handleLike(blog.id, blogToUpdate)
    }

    const { id } = useParams()
    const blog = blogs.find(b => b.id === id)

    if (!blog) return null
    
    return (
        <Card sx={{ maxWidth: 600, mt: 3, mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }} className="blog-title">
                    {blog.title}
                </Typography>

                <Typography variant="subtitle1" sx={{ color: 'grey' }}>
                    by {blog.author}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }} className="blog-url">
                    {blog.url}
                </Typography>

                <Typography variant="body2" sx={{ color: 'grey', mt: 1 }}>
                    Added by {blog.user?.name || blog.user?.username}
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                    <Typography variant="body1" className="blog-likes" sx={{ mr: 1 }}>{blog.likes} likes</Typography>
                    {user && <Button variant="outlined" size="small" className="like-button" onClick={onLike}>like</Button>}
                    {blog.user?.name === user?.name && <Button variant="outlined" size="small" color="error" className="remove-button" onClick={() => handleRemove(blog.id)} sx={{ ml: 1 }}>remove</Button>}
                </div>
            </CardContent>
        </Card>

    /*<Card sx={{ maxWidth: 600, mt: 3, mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
            <strong className="blog-title">{blog.title} {blog.author}</strong>
            <p className="blog-url">{blog.url}</p>
            <p className="blog-likes">{blog.likes} likes {user && <button className="like-button" onClick={onLike}>like</button>}</p>
            
            <p>added by {blog.user?.name || blog.user?.username}</p>  
            {blog.user?.name === user?.name && <button className="remove-button" onClick={() => handleRemove(blog.id)}>remove</button>}
        </CardContent>
    </Card>*/
    )
}

export default BlogView