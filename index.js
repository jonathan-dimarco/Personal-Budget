const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const envelopesRouter = require("./routes/envelopes");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/v1/envelopes/', envelopesRouter);

app.get('/', (req, res) => {
  res.send("Node.js, Express.js, and Postgres API")
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});