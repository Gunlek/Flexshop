let express = require('express');

let app = express();

let workshop_api = require('./api/workshops.js');
let machines_api = require('./api/machines.js');
let sections_api = require('./api/sections.js');
app.use('/workshops', workshop_api);
app.use('/machines', machines_api);
app.use('/sections', sections_api)

app.listen(8080);
