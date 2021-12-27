const config = require('./config')

const express = require('express')


const app = express();

const http = require('http').createServer(app);

const bodyParser = require('body-parser')
const cors = require('cors')

// Middlewares
app.use(cors())
app.use(bodyParser.json())

//Routes
app.use('/api/search',  require('./routes/search'));

//start server
var port = config.port || 5000;
http.listen(port, () => {
    console.log(`Server Started! listening on ${port}`);
});