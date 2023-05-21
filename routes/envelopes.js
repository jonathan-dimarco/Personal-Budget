const envelopesRouter = require("express").Router();
const getEnvelopes = require("../controllers/envelopes");

envelopesRouter.get('/', getEnvelopes);


module.exports = envelopesRouter;