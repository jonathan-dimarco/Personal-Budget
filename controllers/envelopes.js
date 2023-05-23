const db = require('../db/db');


//Gets all envelopes
const getEnvelopes = async (req, res) => {
  const query = 'SELECT * FROM envelopes ORDER BY id ASC';
  try{
    const envelopes = await db.query(query);
    if(envelopes.rowCount < 1) {
      return res.status(404).send("Records Not Found");
    }
    res.status(200).send(envelopes.rows);
  } catch(err){
    return res.status(500).send({
			error: err.message
		});
  }
  };

//Get specific envelope by ID
const getEnvelopesById = async (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM envelopes WHERE id = $1';
  try{
    const envelope = await db.query(query, [id]);
    if (envelope.rowCount < 1) {
      return res.status(404).send("Envelope Not Found!")
    }
    res.status(200).send(envelope.rows);
  } catch (err) {
    res.status(500).send({
			error: err.message
		});
  }
}

//Create a new envelope
const createEnvelope = async (req, res) => {
  const { title, budget } = req.body;
  const query = "INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *";
  try{
    const envelope = await db.query(query, [title, budget]);
    res.status(201).send(`Envelope created successfully with id: ${envelope.rows[0].id}`);
  } catch(err) {
    res.status(500).send({error: err.message});
  }
};

//Update an existing envelope

const updateEnvelope = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, budget } = req.body;
  const query = "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *";
try {
    const envelope = await db.query(query, [title, budget, id]); 
    if (envelope.rowCount < 1) {
      return res.status(404).send("Envelope Not Found!")
    }
    res.status(200).send(envelope.rows[0]);
  } catch (err) {
    res.status(500).send({
			error: err.message
		});
  }
}


//Delete an existing envelope

const deleteEnvelope = async (req, res) => {
  const id = parseInt(req.params.id);
  const selectQuery = "SELECT * FROM envelopes WHERE id = $1";
  const deleteQuery = "DELETE FROM envelopes WHERE id = $1";

  try {
    const envelope = await db.query(selectQuery, [id]);
    if(envelope.rowCount < 1) {
      return res.status(404).send("Envelope Not Found!");
    }
    await db.query(deleteQuery, [id]);
    res.status(200).send(`Envelope with id: ${envelope.rows[0].id} deleted successfully`)
  }
  catch(err) {
    res.status(500).send({error: err.message});
  }

}

module.exports = { getEnvelopes, getEnvelopesById, createEnvelope, updateEnvelope, deleteEnvelope };