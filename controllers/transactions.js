const db = require('../db/db');

//Gets all transactions
const getTransactions = async (req, res) => {
  const query = 'SELECT * FROM transactions ORDER BY id ASC';
  try{
    const transactions = await db.query(query);
    if(transactions.rowCount < 1) {
      return res.status(404).send("Records Not Found");
    }
    res.status(200).send(transactions.rows);
  } catch(err){
    return res.status(500).send({
			error: err.message
		});
  }
  };

//Get transaction by id
  const getTransactionById = async (req, res) => {
	const id  = req.params.id;
	const query = "SELECT * FROM transactions WHERE id = $1;";

  try {
		const transaction = await db.query(query, [id]);
    if (transaction.rowCount < 1) {
      return res.status(404).send("Transaction Not Found");
		}
		res.status(200).send(transaction.rows[0]);
  } catch (err) {
    return res.status(500).send({
			error: err.message
		});
  }
};

//Add a new transaction
const createTransaction = async (req, res) => {
    const { from_id, to_id, amount } = req.body;
    const fromEnvelope = "SELECT * FROM envelopes WHERE id = $1";
    const toEnvelope = "SELECT * FROM envelopes WHERE id = $1";
    const addTransaction = "INSERT INTO transactions(from_id, to_id, amount) VALUES($1, $2, $3) RETURNING*";
    const updateFromEnvelope = "UPDATE envelopes SET budget = budget - $1 WHERE id = $2";
    const updateToEnvelope = "UPDATE envelopes SET budget = budget + $1 WHERE id = $2";

    try {
        const checkFromEnvelope = await db.query(fromEnvelope, [from_id]);
        const checkToEnvelope = await db.query(toEnvelope, [to_id]);
        if(checkFromEnvelope.rowCount < 1) {
            return res.status(404).send("Envelope to sustract not found!");
        }
        if(checkToEnvelope.rowCount < 1) {
            return res.status(404).send("Envelope to add Not Found!");
        }
        if(from_id === to_id) {
          return res.status(404).send("You can't transfer money into the same envelope!");
        }
        if(checkFromEnvelope.rows[0].budget < amount) {
            return res.status(404).send("insufficient Founds in Envelope!");
        }
        const insertTransaction = await db.query(addTransaction, [from_id, to_id, amount]);
        const updateFromEnvelopeBudget = await db.query(updateFromEnvelope, [amount, from_id]);
        const updateToEnvelopeBudget = await db.query(updateToEnvelope, [amount, to_id]);
        res.status(201).send("Transaction created succesfully");
    } catch (err) {
    return res.status(500).send({
			error: err.message
		});
  }
};

//Delete a Transaction
const deleteTransaction = async (req, res) => {

const id = parseInt(req.params.id);
const transactionQuery = "SELECT * FROM transactions WHERE id = $1"
const amountQuery = "SELECT amount FROM transactions WHERE id = $1"
const updateFromEnvelopeQuery = `UPDATE envelopes SET budget = budget + $1 
WHERE id IN (SELECT from_id FROM transactions WHERE id = $2)`
const updateToEnvelopeQuery = `UPDATE envelopes SET budget = budget - $1 
WHERE id IN (SELECT to_id FROM transactions WHERE id = $2)`
const deleteTransactionQuery = "DELETE FROM transactions WHERE id=$1";

try {
  const transaction = await db.query(transactionQuery, [id]);
  if(transaction.rowCount < 1) {
    res.status(404).send("Transaction Not Found!");
  }
  const amount = await db.query(amountQuery, [id]);
  await db.query(updateFromEnvelopeQuery, [amount.rows[0].amount, id]);
  await db.query(updateToEnvelopeQuery, [amount.rows[0].amount, id]);
  await db.query(deleteTransactionQuery, [id]);
  res.status(204).send("Transaction deleted succesfully");
} catch(err) {
  res.status(500).send({error: err.message});
}
};

module.exports = { getTransactions, getTransactionById, createTransaction, deleteTransaction};