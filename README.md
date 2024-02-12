# 🚀 Node CRUD API

Implement simple CRUD API using in-memory database underneath.

#### [Task 3](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

---

#### Installation

Clone repo

```bash
$ git clone https://github.com/IrinaEnotova/node-crud-api.git
```

Change directory

```bash
$ cd node-crud-api
```

Change branch

```bash
$ git checkout dev
```

Install dependencies

```bash
$ npm install
```

#### Running the app

Start development server:

```
$ npm run start:dev
```

Start production server:

```
$ npm run start:prod
```

Start server with Cluster API:

```
$ npm run start:multi
```

Run tests:

```
$ npm run test
```

## Implementation details

1. GET api/users is used to get all persons

- Server should answer with status code 200 and all users records

2. GET api/users/{userId}

- Server should answer with status code 200 and record with id === userId if it exists
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

3. POST api/users is used to create record about new user and store it in database

- Server should answer with status code 201 and newly created record
- Server should answer with status code 400 and corresponding message if request body does not contain required fields

4. PUT api/users/{userId} is used to update existing user

- Server should answer with status code 200 and updated record
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

5. DELETE api/users/{userId} is used to delete existing user from database

- Server should answer with status code 204 if the record is found and deleted
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

## Data structure

Users are stored as objects that have following properties:

1. id — unique identifier (string, uuid) generated on server side
2. username — user's name (string, required)
3. age — user's age (number, required)
4. hobbies — user's hobbies (array of strings or empty array, required)
