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
 * Ajoute une catégorie à la base de données
 * @param {json} data Un tableau Json décrivant la catégorie à ajouter
 */
router.post("/add", urlencoded, (req, res) => {
    let data = req.body;
    db.addCategory(data, (err_code) => {
        if(err_code == 0)
            res.sendStatus(201);
        else
            res.sendStatus(400);
    });
});

/**
 * Récupère la liste de toutes les catégories
 * depuis la base de donnée
 * @return {http/json} Un document Json qui décrit toutes les catégories trouvées
 */
router.get('/list', (req, res) => {
    db.getAllCategories((result) => {
        res.json(result);
    });
});

/**
 * Met à jour la catégorie décrite par l'id
 * @param {json} data Un tableau Json décrivant les modifications à effectuer
 */
router.put("/update/:id", urlencoded, (req, res) => {
    let data = req.body;
    db.updateCategoryById(req.params.id, data, () => {
        res.sendStatus(200);
    });
});

/**
 * Supprime la catégorie correspondante à
 * l'id fourni
 * @param {number} id L'id de la catégorie à supprimer
 */
router.delete("/delete/:id", (req, res) => {
    deletes.deleteCategory(req, res, db);
});

/**
 * Récupère les données d'une catégorie depuis
 * la base de donnée en fonction de l'id
 * fourni
 * @param {number} id L'id de la catégorie à récupérer 
 * @return {http/json} Un document Json qui décrit la catégorie demandée
 */
router.get("/get/:id", (req, res) => {
    db.getCategoryById(req.params.id, (result) => {
        if(result != undefined)
            res.json(result);
        else
            res.sendStatus(204)
    });
});

module.exports = router;