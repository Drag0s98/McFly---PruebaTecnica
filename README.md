## Description

This is a messaging API, in which you can register and log in to be able to send or receive messages, as well as consult information about other users, such as their activity status. 

## Installation

1. Install the dependencies: `npm install`

2. Start MongoDB and create a database called McFly.
(If not, there is a database hosted in the cloud so that it can be tested, see the section on environment variables)


3. Set the environment variables in the `.env`.

   | Variable                      | Description                                                  |
   | ----------------------------- | ------------------------------------------------------------ |
   | JWT_SECRET                    | String to be used as JWT secret                              |
   | MONGO_CONNECTION_URI          | URI of the MongoDB server(Example DB: mongodb+srv://testUser:CYEhC7XwXrQ5CUli@cluster0.lk7uu.mongodb.net/McFly)                                   |
   | SALT_ROUNDS                   | Random string of characters known only to the site to each password before it is hashed |


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
