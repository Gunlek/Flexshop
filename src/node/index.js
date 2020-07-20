let express = require('express');
let fileUpload = require('express-fileupload');
let fs = require('fs');

require('dotenv').config()

let app = express();

app.use(fileUpload());
app.use(express.static('./statics/'));

let workshop_api = require('./api/workshops.js');
let machines_api = require('./api/machines.js');
let sections_api = require('./api/sections.js');
let category_api = require('./api/category.js');
let parameters_api = require('./api/parameters.js');
let slides_api = require('./api/slides.js');

app.use('/workshops', workshop_api);
app.use('/machines', machines_api);
app.use('/sections', sections_api)
app.use('/category', category_api);
app.use('/parameters', parameters_api);
app.use('/slides', slides_api);

app.post('/upload-file', (req, res) => {
    let uploaded_file = req.files.file;
    if(!fs.existsSync('statics/img'))
        fs.mkdirSync('statics/img');
    uploaded_file.mv("statics/img/"+uploaded_file.name);
});

let web_interface = require('./web_interface/main.js');
app.use('/', web_interface);

app.listen(process.env.API_PORT);

exports.app = app;
