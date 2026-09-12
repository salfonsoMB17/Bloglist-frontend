import { render } from '@testing-library/react'
import BlogView from './BlogView'
import { vi } from 'vitest'

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' })
}))

test('unauthenticated user sees blog info and likes but no buttons', () => {
  const blog = {
    id: '1',
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 10,
    user: { name: 'Test User', username: 'testuser' }
  }

  const { container } = render(
    <BlogView blogs={[blog]} handleLike={() => {}} handleRemove={() => {}} user={null} />
  )

  expect(container.querySelector('.blog-title')).toBeVisible()
  expect(container.querySelector('.blog-url')).toBeVisible()
  expect(container.querySelector('.blog-likes')).toBeVisible()
  expect(container.querySelector('.like-button')).not.toBeInTheDocument()
  expect(container.querySelector('button[onClick]')).not.toBeInTheDocument()
})

test('authenticated non-creator sees only the like button', () => {
    const blog = {
      id: '1',
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
      user: { name: 'Other User', username: 'otheruser' }
    }

    const mockUser = { name: 'Test User', username: 'testuser' }

    const { container } = render(
      <BlogView blogs={[blog]} handleLike={() => {}} handleRemove={() => {}} user={mockUser} />
    )

    expect(container.querySelector('.like-button')).toBeVisible()
    expect(container.querySelector('.remove-button')).not.toBeInTheDocument()
})

test('blog creator sees both like and remove buttons', () => {
    const blog = {
      id: '1',
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
      user: { name: 'Test User', username: 'testuser' }
    }

    const mockUser = { name: 'Test User', username: 'testuser' }

    const { container } = render(
      <BlogView blogs={[blog]} handleLike={() => {}} handleRemove={() => {}} user={mockUser} />
    )

    expect(container.querySelector('.like-button')).toBeVisible()
    expect(container.querySelector('.remove-button')).toBeVisible()
})