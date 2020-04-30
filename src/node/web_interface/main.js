let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

router.get('/', (req, res) => {res.redirect('/workshops')});

router.get('/workshops', (req, res) => {
    res.render('workshops.html.twig');
});

router.get('/categories', (req, res) => {
    res.render('categories.html.twig');
});

router.get('/machines', (req, res) => {
    res.render('machines.html.twig');
});

router.get('/credits', (req, res) => {
    res.render('credits.html.twig');
});

module.exports = router;