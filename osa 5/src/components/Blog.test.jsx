import {
  render,
  screen,
} from '@testing-library/react';

import Blog from './Blog';

test('renders title and author', () => {
	const blog = {
		user: 'Riku',
		author: 'rtlaut',
		title: 'Riku is King',
		likes: 100,
		url: 'example.com'
	}

	render(<Blog blog={blog} />)
	const titleauthor = screen.getByText('Riku is King rtlaut')
	expect(titleauthor).toBeDefined()
})