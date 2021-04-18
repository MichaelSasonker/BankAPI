const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoutes = require('./users/users.routes');

const app = express();
const port = 8003;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/bank', usersRoutes);

app.listen(process.env.PORT || port, () => console.log(`The server starts at port: ${port}`));
