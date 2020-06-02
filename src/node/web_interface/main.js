let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

let multer  = require('multer')
let fs = require('fs');
if(!fs.existsSync('statics/upload'))
    fs.mkdirSync('statics/upload');
let upload = multer({dest: 'statics/upload' });

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

router.get('/settings', (req, res) => {
    res.render('settings.html.twig');
})

router.get('/export-json', (req, res) => {
    db.getAllWorkshops((workshops) => {
        db.getAllCategories((categories) => {
            db.getAllMachines((machines) => {
                db.getAllSections((sections) => {
                    db.getAllParameters((parameters) => {
                        let json_export = {}
                        json_export['workshops'] = workshops;
                        json_export['categories'] = categories;
                        json_export['machines'] = machines;
                        json_export['sections'] = sections;
                        json_export['parameters'] = parameters;

                        if(!fs.existsSync('./statics/exports')){
                            fs.mkdirSync('./statics/exports');
                        }
                        fs.writeFileSync('./statics/exports/database_export.json', JSON.stringify(json_export));
                        res.download('./statics/exports/database_export.json');
                    });
                });
            });
        });
    });
});

router.post('/import-json', upload.single('import_file'), async (req, res) => {
    let uploaded = req.file.path;
    let file_content = fs.readFileSync(uploaded, {encoding: 'utf-8'});
    let json_data = JSON.parse(file_content);
    for(let key in json_data){
        switch(key){
            case 'workshops':
                for(let k=0; k < json_data[key].length; k++){
                    let insert_data = {};
                    for(let subkey in json_data[key][k]){
                        insert_data[subkey] = json_data[key][k][subkey];
                    }
                    db.createNewWorkshop(insert_data, ()=>{});
                }
                break;

            case 'categories':
                for(let k=0; k < json_data[key].length; k++){
                    let insert_data = {};
                    for(let subkey in json_data[key][k]){
                        insert_data[subkey] = json_data[key][k][subkey];
                    }
                    db.createNewCategory(insert_data, ()=>{});
                }
                break;
            
            case 'machines':
                for(let k=0; k < json_data[key].length; k++){
                    let insert_data = {};
                    for(let subkey in json_data[key][k]){
                        insert_data[subkey] = json_data[key][k][subkey];
                    }
                    db.createNewMachine(insert_data, ()=>{});
                }
                break;
            
            case 'sections':
                for(let k=0; k < json_data[key].length; k++){
                    let insert_data = {};
                    for(let subkey in json_data[key][k]){
                        insert_data[subkey] = json_data[key][k][subkey];
                    }
                    db.createNewSection(insert_data, ()=>{});
                }
                break;

            case 'parameters':
                for(let k=0; k < json_data[key].length; k++){
                    let insert_data = {};
                    for(let subkey in json_data[key][k]){
                        insert_data[subkey] = json_data[key][k][subkey];
                    }
                    db.addParameter(insert_data, ()=>{});
                }
                break;
        }
    }
    fs.unlinkSync(uploaded);
    res.redirect('/');
});

module.exports = router;