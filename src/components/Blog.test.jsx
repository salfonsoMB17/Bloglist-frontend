import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest';

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

test('renders title and author and shows url and likes when clicked', async () => {
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

  const button = container.querySelector('.toggle-button')

  fireEvent.click(button);
  
  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')

  expect(url).toBeVisible()
  expect(likes).toBeVisible()

})

test('clicking like button twice calls event handler twice', async () => {    
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

  const clickSpy = vi.fn()

  const { container } = render(<Blog blog={blog} updateBlog={clickSpy} removeBlog={() => {}} user={{ name: 'Test User' }} />)

  const toggleButton = container.querySelector('.toggle-button')
  fireEvent.click(toggleButton)

  const likeButton = container.querySelector('.like-button')
  
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  
  expect(clickSpy).toHaveBeenCalledTimes(2)
})

