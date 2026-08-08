import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('form calls event handler with correct details when a new blog is created', () => {
  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('[name="title"]')
  const authorInput = container.querySelector('[name="author"]')
  const urlInput = container.querySelector('[name="url"]')

  fireEvent.change(titleInput, { target: { value: 'Test Title' } })
  fireEvent.change(authorInput, { target: { value: 'Test Author' } })
  fireEvent.change(urlInput, { target: { value: 'http://test.com' } })

  const form = container.querySelector('form')
  fireEvent.submit(form)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com'
  })
})
