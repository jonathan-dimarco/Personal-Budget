const { response } = require('express');
const db = require('../db/db');

const getEnvelopes = (req, res) => {
    db.query('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = getEnvelopes;