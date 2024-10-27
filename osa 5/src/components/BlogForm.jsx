import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault();
        try {
            const newBlog = await blogService.create({
              title, author, url
            })
            setSuccessMessage(`A new blog ${title} by ${author} added`)
            setBlogs(blogs.concat(newBlog))
            setTitle('');
            setAuthor('');
            setUrl('');
            setTimeout(() => { setSuccessMessage(null) }, 5000)
        } catch (exception) {
          setErrorMessage('Failed to add blog');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      };
    

      return(
        <form onSubmit={addBlog}>
        <div>
            Title:
            <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            Author:
            <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            URL:
            <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
        </form>
      ) 
}

  export default BlogForm