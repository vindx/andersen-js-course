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
const officesRoute = require('./routes/offices');

app.use('/departments', departmentsRoute);
app.use('/offices', officesRoute);

app.get('/', (req, res) => {
  res.send(
    `Welcome to my first server ;) <br> You may use: <br> <br>"/departments" for seeing JSON of departments!<br>"/departments/:departmentId" for seeing JSON of a particular department!<br> <br>"/offices" for seeing JSON of offices!<br> "/offices/:departmentId" for seeing JSON of offices of a particular department!`
  );
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
