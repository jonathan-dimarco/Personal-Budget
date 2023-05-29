const transactionsRouter = require("express").Router();
const { getTransactions, getTransactionById, createTransaction } = require("../controllers/transactions.js");

transactionsRouter.get("/", getTransactions);
transactionsRouter.get("/:id", getTransactionById);
transactionsRouter.post("/", createTransaction);























module.exports = transactionsRouter;