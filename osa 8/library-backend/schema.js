const typeDefs = `
    type Subscription {
        bookAdded: Book!
    } 

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        recommendations: [Book!]!
    }

    type Mutation {
        addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
        ): Book!

        editAuthor(name: String!, setBornTo: Int!): Author
        
        createUser(
        username: String!
        favoriteGenre: String!
        ): User

        login(
        username: String!
        password: String!
        ): Token
    }
`;

module.exports = typeDefs;
