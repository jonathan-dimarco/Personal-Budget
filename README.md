# personal-budget

Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create transactions between envelopes. All data is persisted in a database using PostgreSQL.

## Running the app
To run locally, run `npm install`, then `npm start`

Once the app is running locally, you can access the API at `http://localhost:3001/`

## Testing with Swagger
Swagger documentation and testing available at `http://localhost:3001/api/v1/api-docs`

To test with Swagger:

### Envelopes:
----
 - Retrieve envelopes using `GET /api/v1/envelopes`
 - Retrieve a single envelope using `GET /api/v1/envelopes/{id}`
 - Create an envelope using `POST /api/v1/envelopes`
 - Update an envelope using `PUT /api/v1/envelope/{id}`
 - Delete an envelope using `DELETE /api/v1/envelope/{id}`

### Transactions:
___
 - Retrieve transactions using `GET /api/v1/transactions`
 - Retrieve a single transaction using `GET /api/v1/transactions/{id}`
 - Delete an envelope using `DELETE /api/v1/transactions/{id}`

## Resources
- NodeJS
- Express
- PostgreSQL 
- Swagger
- Postman


