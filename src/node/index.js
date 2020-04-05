let express = require('express');

let app = express();

let workshop_api = require('./api/workshops.js');
app.use('/workshops', workshop_api);

app.listen(8080);
