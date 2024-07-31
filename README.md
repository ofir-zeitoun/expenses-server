
# Expenses Server Node js

Expenses Server is the backend component of the Expenses application, built with Node.js, Express, and TypeScript.
It provides  API endpoints for user authentication, expense management, and data persistence with MongoDb and visualization with Swagger Ui.
  ### Links
- **Project Board**: [GitHub Project](https://github.com/users/ofir-zeitoun/projects/2)
- **Frontend Repository**: [Expenses Client](https://github.com/ofir-zeitoun/expenses-client)
- **Backend Repository**: [Expenses Server](https://github.com/ofir-zeitoun/expenses-server)
- **Design (Figma)**: [Figma Design](https://www.figma.com/file/QaLtJUErrNqG1TWroa8xUa/Untitled?type=design&node-id=2-1353&mode=design&t=K6H7aqa675qbkX7G-0)

## Features

#### User Authentication: 
Provides secure user registration, login, and authorization functionalities.
#### Expense Management API: 
Exposes an API for CRUD (create, read, update, delete) operations on expense data.
#### Data Validation: 
Implements validation rules to ensure data integrity on the server-side using Zod.



## Run Locally

Clone the project

```bash
  git clone https://github.com/ofir-zeitoun/expenses-server.git
```

Go to the project directory

```bash
  cd expenses-server
```

Install dependencies

```bash
  npm install
```

  Create a `.env` file in the root directory and add necessary environment variables for connections and configurations.


Start the server

```bash
  npm run dev
```

## Technologies Used
- Node Js with express and Typescript
- Swagger UI docs API
- [Zod](https://zod.dev/) for server side validation
- MongoDb NoSQL Database 

## New issues , bug report and features
Open a new issue or bug [here](https://github.com/ofir-zeitoun/expenses-server/issues/new).

1. Add the proper title (For example Updating Readme file)
2. Add description.
- For issues or bugs write how to reproduce the error (Step by step guide or a video)
1. add corresponding label (Feature, Bug , ect..)
 
### License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ofir-zeitoun/expenses-client/blob/main/LICENSE) file for details.
