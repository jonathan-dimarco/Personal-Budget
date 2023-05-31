const transactionsRouter = require("express").Router();
const { getTransactions, getTransactionById, createTransaction, deleteTransaction } = require("../controllers/transactions.js");

transactionsRouter.get("/", getTransactions);
transactionsRouter.get("/:id", getTransactionById);
transactionsRouter.post("/", createTransaction);
transactionsRouter.delete("/:id", deleteTransaction);























module.exports = transactionsRouter;