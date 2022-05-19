const express = require('express');

var bodyParser = require('body-parser');

const route = require('./router/router.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://harshshri:harsh001@cluster0.zdm3o.mongodb.net/project4", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);




app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});