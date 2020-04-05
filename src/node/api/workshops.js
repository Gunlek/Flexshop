let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

router.use(function timeLog(req, res, next) {
  next();
});

/**
 * Ajoute un workshop à la base de données
 * @param {json} data Un tableau Json décrivant le workshop à ajouter
 */
router.post("/add", urlencoded, (req, res) => {
    let data = req.body;
    db.addWorkshop(data, (err_code) => {
        if(err_code == 0)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
});

/**
 * Récupère la liste de tous les workshops
 * depuis la base de donnée
 * @return {http/json} Un document Json qui décrit tous les workshops trouvés
 */
router.get('/list', (req, res) => {
    db.getAllWorkshops((result) => {
        res.json(result);
    });
});

/**
 * Met à jour le workshop décrit par l'id
 * @param {json} data Un tableau Json décrivant les modifications à effectuer
 */
router.put("/update/:id", urlencoded, (req, res) => {
    let data = req.body;
    db.updateWorkshopById(req.params.id, data, () => {
        res.sendStatus(200);
    });
});

/**
 * Supprime le workshop correspondant à
 * l'id fourni
 * @param {number} id L'id du workshop à supprimer
 */
router.delete("/delete/:id", (req, res) => {
    db.deleteWorkshopById(req.params.id, (result) => {
        res.sendStatus(200);
    });
});

/**
 * Récupère les données d'un workshop depuis
 * la base de donnée en fonction de l'id
 * fourni
 * @param {number} id L'id du workshop à récupérer 
 * @return {http/json} Un document Json qui décrit le workshop demandé
 */
router.get("/get/:id", (req, res) => {
    db.getWorkshopById(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

module.exports = router;