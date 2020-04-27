let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

router.get('/', (req, res) => {
    res.render('home.html.twig');
});

module.exports = router;