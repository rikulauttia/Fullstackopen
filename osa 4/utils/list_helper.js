const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  mostLikedBlog = blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}