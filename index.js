const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const envelopesRouter = require("./routes/envelopes");
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/envelopes', envelopesRouter);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});