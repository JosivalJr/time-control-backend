## 🧪 Technologies

<p align="center">
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></a>
  <a href="https://expressjs.com/pt-br/"><img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"></a>
  <a href="https://www.sqlite.org/docs.html"><img src="https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"></a>
  <a href="https://jestjs.io/pt-BR/"><img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"></a>
  <a href="https://eslint.org/docs/latest/use/getting-started"><img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"></a>
  <a href="https://prettier.io/docs/en/"><img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"></a>
</p>

<br>

## 🚀 How Execute

<br>

- Clone the project and access repository folder.

```bash
$ git clone https://github.com/JosivalJr/time-control-backend.git

$ cd time-control-backend
```

<br>

- Create .env file in project folder:

```bash
# At project root terminal
$ echo > ".env"
```

<br>

- Use the `.env.example` file to fill in the variables correctly, using your tools for execution.

<br>

- To start application, follow the steps below:

```bash
# Install the dependencies
$ npm install

# Start the project in development environment
$ npm run dev

```

- The app will be available in your browser at localhost at the port filled in your .env file

<br>

## ⚙️ How to Test

```bash

$ npm run test

# Or

# Run in silent and watch mode
$ npm run test:silent

```

<br>

## 🗄️ Configure Database

- To run all migrations:

```bash

$ npm run knex:migrate

```

- To fill seeds:

```bash

$ npm run knex:seed

```

- To run rollbacks:

```bash
# Rollback latest migration
$ npm run knex:rollback

# Or

# Rollback all migrations
$ npm run knex:rollback-all

```

<br><br>

## 📝 License

This project is under the MIT license. see the file [LICENSE](./LICENSE.md) for more details.
