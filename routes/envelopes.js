const envelopesRouter = require("express").Router();
const { getEnvelopes, getEnvelopesById, createEnvelope, updateEnvelope, deleteEnvelope } = require("../controllers/envelopes.js");

envelopesRouter.get("/", getEnvelopes);
envelopesRouter.get("/:id", getEnvelopesById);
envelopesRouter.post("/", createEnvelope);
envelopesRouter.put("/:id", updateEnvelope);
envelopesRouter.delete("/:id", deleteEnvelope);



module.exports = envelopesRouter;