const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const baseRouter = require("./src/base_route");
const { initialize_mongo_connection } = require("./src/database/mongo");
const port = process.env.PORT || 4000;
const app = express();

app.set('port', process.env.PORT || 4000)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use('/api', baseRouter)

app.listen(app.get('port'), (data) => {
    initialize_mongo_connection()
    console.log(`Express App Running on Port ${app.get('port')}`);
})

app.get('*', function (req, res) {
    res.status(404).json('Invalid Url')
})