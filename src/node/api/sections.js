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
 * Ajoute une section à la base de données
 * @param {json} data Un tableau Json décrivant la section à ajouter
 */
router.post("/add", urlencoded, (req, res) => {
    let data = req.body;
    db.addSection(data, (err_code) => {
        if(err_code == 0)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
});

/**
 * Récupère la liste de toutes les sections
 * depuis la base de donnée
 * @return {http/json} Un document Json qui décrit toutes les sections trouvées
 */
router.get('/list', (req, res) => {
    db.getAllSections((result) => {
        res.json(result);
    });
});

/**
 * Met à jour la section décrit par l'id
 * @param {json} data Un tableau Json décrivant les modifications à effectuer
 */
router.put("/update/:id", urlencoded, (req, res) => {
    let data = req.body;
    db.updateSectionById(req.params.id, data, () => {
        res.sendStatus(200);
    });
});

/**
 * Supprime la section correspondante à
 * l'id fourni
 * @param {number} id L'id de la section à supprimer
 */
router.delete("/delete/:id", (req, res) => {
    db.deleteSectionById(req.params.id, (result) => {
        res.sendStatus(200);
    });
});

/**
 * Récupère les données d'une section depuis
 * la base de donnée en fonction de l'id
 * fourni
 * @param {number} id L'id de la section à récupérer 
 * @return {http/json} Un document Json qui décrit la section demandée
 */
router.get("/get/:id", (req, res) => {
    db.getSectionById(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

module.exports = router;