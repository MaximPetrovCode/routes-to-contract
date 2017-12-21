const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// //use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
require('./routes/routes')(app);

const port = 3000;
app.listen(port, ()=>{
    console.log('Middleware is run on '+port+' port');
});