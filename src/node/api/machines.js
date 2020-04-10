let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

/**
 * Ajoute une machine à la base de données
 * @param {json} data Un tableau Json décrivant la machine à ajouter
 */
router.post("/add", urlencoded, (req, res) => {
    let data = req.body;
    db.addMachine(data, (err_code) => {
        if(err_code == 0)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
});

/**
 * Récupère la liste de toutes les machines
 * depuis la base de donnée
 * @return {http/json} Un document Json qui décrit toutes les machines trouvées
 */
router.get('/list', (req, res) => {
    db.getAllMachines((result) => {
        res.json(result);
    });
});

/**
 * Met à jour la machine décrite par l'id
 * @param {json} data Un tableau Json décrivant les modifications à effectuer
 */
router.put("/update/:id", urlencoded, (req, res) => {
    let data = req.body;
    db.updateMachineById(req.params.id, data, () => {
        res.sendStatus(200);
    });
});

/**
 * Supprime la machine correspondante à
 * l'id fourni
 * @param {number} id L'id de la machine à supprimer
 */
router.delete("/delete/:id", (req, res) => {
    db.deleteMachineById(req.params.id, (result) => {
        res.sendStatus(200);
    });
});

/**
 * Récupère les données d'une machine depuis
 * la base de donnée en fonction de l'id
 * fourni
 * @param {number} id L'id de la machine à récupérer 
 * @return {http/json} Un document Json qui décrit la machine demandée
 */
router.get("/get/:id", (req, res) => {
    db.getMachineById(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

router.

