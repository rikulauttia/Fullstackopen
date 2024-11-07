import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BlogForm from './BlogForm';

test('<BlogForm /> calls callback function with right data', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
  
    render(<BlogForm createBlog={createBlog} />)
  
    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const button = screen.getByText('create')
  
    await user.type(title, 'Riku is King')
    await user.type(author, 'rtlaut')
    await user.type(url, 'example.com')
    await user.click(button)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Riku is King')
    expect(createBlog.mock.calls[0][0].author).toBe('rtlaut')
    expect(createBlog.mock.calls[0][0].url).toBe('example.com')
  })