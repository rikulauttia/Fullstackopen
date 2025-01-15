# Full Stack Open Course Projects

This repository contains projects and exercises completed as part of the [Full Stack Open](https://fullstackopen.com/) course offered by the University of Helsinki. This course covers modern web development using JavaScript-based front-end and back-end technologies.

## Course Overview

The Full Stack Open course is an in-depth program focusing on building full-stack applications using the latest web technologies. It provides practical experience with tools and frameworks to create scalable and efficient applications.

### Key Topics Covered

- **Frontend Development**
  - **React**: For building responsive and interactive UIs.
  - **Redux**: For state management in complex applications.
  - **TypeScript**: Adds type safety, making JavaScript code more reliable and maintainable.

- **Backend Development**
  - **Node.js**: A JavaScript runtime for server-side development.
  - **Express**: A fast and minimal web server framework for building APIs.
  - **MongoDB**: A NoSQL database for flexible and scalable data storage.

- **APIs and Data Handling**
  - **GraphQL**: For querying and manipulating data more efficiently than REST.

- **Testing**
  - **Jest**: Unit testing and integration testing for JavaScript applications.
  - **Cypress**: End-to-end testing to ensure application stability.

### Getting Started

#### Prerequisites

To run these projects locally, you will need:

- **Node.js** (v14 or later recommended)
- **npm** (Node Package Manager)

#### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate into the project directory of each specific project or section:
   ```bash
   cd <project-folder>

3. Check package.json for available scripts:
   Before proceeding, review the scripts section of package.json. Some projects may require building the project first:
   ```bash
   npm run build


4. Install project dependencies:
   ```bash
   npm install

5. Start the development server or application:
   For most projects:
   ```bash
   npm start

  If npm start doesn't work, you may need to run the development server:
  ```bash
  npm run dev
```

#### Running Tests

For projects with tests, you can run them using:
```bash
npm test
```

#### Running Tests
Always check the README.md or package.json in individual projects for any specific instructions or dependencies.
Ensure that the required Node.js version matches the project's engines field in package.json (if specified).
