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