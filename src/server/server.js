const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());

// import Routes
const departmentsRoute = require('./routes/departments');

app.use('/', departmentsRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
