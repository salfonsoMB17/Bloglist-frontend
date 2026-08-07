import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test',
    url: 'http://test.com',
    likes: 0,
    user: {
        name: 'Test User',
        username: 'testuser'
    }
    }

  const { container } = render(<Blog blog={blog} updateBlog={() => {}} removeBlog={() => {}} user={{ name: 'Test User' }} />)

  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')
  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')
  
  expect(title).toHaveTextContent('Component testing is done with react-testing-library')
  expect(author).toHaveTextContent('test')
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})
