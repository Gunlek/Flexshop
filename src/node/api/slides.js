let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

let deletes = require('./deletes');

router.use(function timeLog(req, res, next) {
  next();
});

/**
 * Ajoute une slide à la base de données
 * @param {json} data Un tableau Json décrivant la slide à ajouter
 */
router.post("/add", urlencoded, (req, res) => {
    let data = req.body;
    db.addSlide(data, (err_code) => {
        if(err_code == 0)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
});

/**
 * Récupère la liste de toutes les slides
 * depuis la base de donnée
 * @return {http/json} Un document Json qui décrit toutes les slides trouvées
 */
router.get('/list', (req, res) => {
    db.getAllSlides((result) => {
        res.json(result);
    });
});

/**
 * Met à jour la slide décrite par l'id
 * @param {json} data Un tableau Json décrivant les modifications à effectuer
 */
router.put("/update/:id", urlencoded, (req, res) => {
    let data = req.body;
    db.updateSlideById(req.params.id, data, () => {
        res.sendStatus(200);
    });
});

/**
 * Supprime la slide correspondante à
 * l'id fourni
 * @param {number} id L'id de la slide à supprimer
 */
router.delete("/delete/:id", (req, res) => {
    db.deleteSlideById(req.params.id, () => {
        res.sendStatus(200);
    });
});

/**
 * Récupère les données d'une slide depuis
 * la base de donnée en fonction de l'id
 * fourni
 * @param {number} id L'id de la slide à récupérer 
 * @return {http/json} Un document Json qui décrit la slide demandée
 */
router.get("/get/:id", (req, res) => {
    db.getSlideById(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

/**
 * Récupère toutes les slides d'une machine
 * dont l'id est fourni
 * fourni
 * @param {number} id L'id de la slide à récupérer 
 * @return {http/json} Un document Json qui décrit la slide demandée
 */
router.get("/get/machine/:id", (req, res) => {
    db.getMachineSlides(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

module.exports = router;