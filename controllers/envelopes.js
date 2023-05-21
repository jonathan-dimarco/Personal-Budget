const { response } = require('express');
const db = require('../db/db');


//Gets all envelopes
const getEnvelopes = (req, res) => {
    db.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    })
  };

//Get specific envelope by ID
const getEnvelopesById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query('SELECT * FROM envelopes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

//Create a new envelope
const createEnvelope = (req, res) => {
  const { title, budget } = req.body;

  db.query("INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *", [title, budget], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send(`Envelope Created with id: ${results.rows[0].id}`);
  })
};

//Update an existing envelope

const updateEnvelope = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, budget } = req.body;

  db.query("UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3", [title, budget, id], (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).send(`Envelope updated with id: ${id}`);
  })
}

//Delete an existing envelope

const deleteEnvelope = (req, res) => {
  const id = parseInt(req.params.id);

  db.query("DELETE FROM envelopes WHERE id = $1", [id], (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).send(`Envelope with id: ${id} deleted succesfully`);
  })

};

module.exports = { getEnvelopes, getEnvelopesById, createEnvelope, updateEnvelope, deleteEnvelope };