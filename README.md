# Demo-code Node Server.
In Progress !!!

This project is just a demonstration of the code and has never been used in an actual project.

Here are some examples of authorization with access and refresh JWT tokens and email confirmation.

There are also examples of using server code using PostgresSQL, MongoDB, Prisma ORM, TypeORM.

Front-End Client is a simple ReactJS application.

# Structure of Demo Project.
```
+ demo-node-react
- + client                        // React App.
- + server-node                   // Node, PostgreSQL, Prisma ORM, Redis, JWT.
- + server-nest                   // Nest, PostgreSQL, TypeOrm, Authentication JWT Strategy.(In progress)
- + server-mongo-simple           // Mode, Mongoose, ...
- + server-postgre-prisma-simple  // Node, PostgreSQL, ...
```

- ## /client
  - Simple React App
    - ReactJS
    - MobX
    - Material UI
    - Formik
    - axios
    - TypeScript

- ## /server-nest (in progress)
  - Server REST API
    - NestJS
    - TypeORM
    - PostgreSQL
    - Migration DB
    - JWT, Passport-jwt, Passport-local
    - Process environment
    - Cookies
    - Redis cache
    - TypeScript
  - Controllers
  - Models
  - Services
  - DTO
  - Entity: Users, Profile, UserRoles, Roles

- ## /server-node
  - Server REST API
    - Node
    - Express
    - Redis
    - PostgreSQL
    - Prisma ORM
    - Migration DB
    - JWT token - access, refresh
    - NodeMailer - for activation account
    - Process environment
    - Cookies
    - TypeScript
  - Controllers
  - Models
  - Services
  - DTO
