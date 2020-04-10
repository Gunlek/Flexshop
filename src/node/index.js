let express = require('express');

let app = express();

let workshop_api = require('./api/workshops.js');
let machines_api = require('./api/machines.js');
app.use('/workshops', workshop_api);
app.use('/machines', machines_api);

app.listen(8080);
