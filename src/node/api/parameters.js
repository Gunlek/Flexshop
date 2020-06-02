let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

let deletes = require('./deletes');

/**
 * Ajoute un paramètre à la base de données
 * @param {json} data Un tableau Json décrivant la machine à ajouter
 */
router.post("/add", urlencoded, (req, res) => {
    let data = req.body;
    db.addParameter(data, (err_code) => {
        if(err_code == 0)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
});

/**
 * Récupère la liste de tous les paramètres
 * depuis la base de donnée
 * @return {http/json} Un document Json qui décrit toutes les machines trouvées
 */
router.get('/list', (req, res) => {
    db.getAllParameters((result) => {
        res.json(result);
    });
});

/**
 * Met à jour le paramètre décrit par l'id
 * @param {json} data Un tableau Json décrivant les modifications à effectuer
 */
router.put("/update/:id", urlencoded, (req, res) => {
    let data = req.body;
    db.updateParametersById(req.params.id, data, () => {
        res.sendStatus(200);
    });
});

/**
 * Supprime le paramètre correspondant à
 * l'id fourni
 * @param {number} id L'id de la machine à supprimer
 */
router.delete("/delete/:id", (req, res) => {
    deletes.deleteParameter(req, res, db);
});

/**
 * Récupère les paramètres associés à la
 * section d'id renseigné depuis
 * la base de donnée en fonction de l'id
 * fourni
 * @param {number} id L'id de la machine à récupérer 
 * @return {http/json} Un document Json qui décrit la machine demandée
 */
router.get("/get/:id", (req, res) => {
    db.getParametersForSectionId(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

module.exports = router;

