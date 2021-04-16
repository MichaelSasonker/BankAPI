const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./users/users.routes');

const app = express();
const PORT = 8003;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/bank', usersRoutes);

app.listen(process.env.PORT || PORT, () => console.log(`The server starts at port: ${PORT}`));
