# personal-budget

Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create transactions between envelopes. All data is persisted in a database using PostgreSQL.

## Running the app
To run locally, run `npm install`, then `npm start`

Once the app is running locally, you can access the API at `http://localhost:5000/`

## Testing with Swagger
Swagger documentation and testing available at `http://localhost:5000/api/v1/api-docs`

To test with Swagger:

### Envelopes:
----
 - Retrieve envelopes using `GET /api/v1/envelopes`
 - Retrieve a single envelope using `GET /api/v1/envelopes/{id}`
 - Create an envelope using `POST /api/v1/envelopes`
 - Update an envelope using `PUT /api/v1/envelope/{id}`
 - Delete an envelope using `DELETE /api/v1/envelope/{id}`
 - Create an envelope transaction using `POST /api/v1/envelop/{id}`

### Transactions:
___
 - Retrieve transactions using `GET /api/v1/transactions`
 - Retrieve a single transaction using `GET /api/v1/transactions/{id}`
 - Update a transaction using `PUT /api/v1/transactions/{id}`
 - Delete an envelope using `DELETE /api/v1/transactions/{id}`

## Resources
- [NodeJS, Express, Sequelize, PostgreSQL RESTful API](https://www.djamware.com/post/5b56a6cc80aca707dd4f65a9/nodejs-expressjs-sequelizejs-and-postgresql-restful-api)
- [Documenting your API with Swagger](https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563)
- [Setting up Postman](https://author.codecademy.com/content-items/a5ed0fe82af00dcae4bb69e07d6b5fa8)
- [Swagger Specification](https://swagger.io/docs/specification/basic-structure/)

## Options for extension
 - Create a frontend that displays envelopes and balances, and allows users to update each envelop balance
 - Add an API endpoint allowing user to add a single balance that’s distributed to multiple envelopes

