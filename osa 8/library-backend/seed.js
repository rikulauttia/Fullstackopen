const mongoose = require("mongoose");
require("dotenv").config();

const Author = require("./models/author");
const Book = require("./models/book");

mongoose.set("strictQuery", false);

const authors = [
  { name: "Robert Martin", born: 1952 },
  { name: "Martin Fowler", born: 1963 },
  { name: "Fyodor Dostoevsky", born: 1821 },
  { name: "Joshua Kerievsky" }, // birthyear not known
  { name: "Sandi Metz" }, // birthyear not known
];

const books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Author.deleteMany({});
    await Book.deleteMany({});
    console.log("Cleared existing data");

    // Insert authors
    const savedAuthors = [];
    for (const author of authors) {
      const newAuthor = new Author(author);
      const savedAuthor = await newAuthor.save();
      savedAuthors.push(savedAuthor);
    }
    console.log("Authors saved:", savedAuthors);

    // Insert books
    for (const book of books) {
      const author = savedAuthors.find((a) => a.name === book.author);
      if (!author) {
        throw new Error(`Author not found for book: ${book.title}`);
      }

      const newBook = new Book({
        ...book,
        author: author._id, // Reference the author ID
      });
      await newBook.save();
    }
    console.log("Books saved");

    mongoose.connection.close();
    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
