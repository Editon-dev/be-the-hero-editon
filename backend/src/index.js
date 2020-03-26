const express = require('express');
const cors = require('cors');
const app = express();
const routs = require('./routs');

app.use(cors());
app.use(express.json());
app.use(routs);


app.listen(3333);
 