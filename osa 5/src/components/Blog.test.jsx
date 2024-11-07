import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import blogService from '../services/blogs';
import Blog from './Blog';

// Mock blogService with default export and the update method
vi.mock('../services/blogs', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      default: {
        ...actual.default,
        update: vi.fn(),
      },
    };
});

test('renders title and author', () => {
	const blog = {
		user: { name: 'Riku' },
		author: 'rtlaut',
		title: 'Riku is King',
		likes: 100,
		url: 'example.com'
	}


	render(<Blog blog={blog} />)
	const titleauthor = screen.getByText('Riku is King rtlaut')
	expect(titleauthor).toBeDefined()
})

test('clicking the view button shows also url, likes and user', async () => {
    const blog = {
		user: {
            name: 'Riku'
        },
		author: 'rtlaut',
		title: 'Riku is King',
		likes: 100,
		url: 'example.com'
	}
    render(
      <Blog blog={blog} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  
    const titleauthor = screen.getByText('Riku is King rtlaut')
	expect(titleauthor).toBeDefined()

    const url = screen.queryByText('example.com')
	expect(url).toBeDefined()

    const likes = screen.queryByText('likes 100')
	expect(likes).toBeDefined()
	
	const name = screen.queryByText('Riku')
	expect(name).toBeDefined()
  })

  test('when like button is pressed two times', async () => {
      const blog = {
          user: {
              name: 'Riku'
            },
            author: 'rtlaut',
            title: 'Riku is King',
            likes: 100,
            url: 'example.com'
        }

        const mockHandler = vi.fn();

        render(
            <Blog blog={blog} updateBlog={mockHandler}/>
        )
        
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        
        blogService.update.mockResolvedValue({
            ...blog,
            likes: blog.likes + 1,
        });

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler).toHaveBeenCalledTimes(2);
  })