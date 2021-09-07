let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: true});
let database = require('../database');
let db = new database().getInstance();

let multer  = require('multer')
let fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(!fs.existsSync('./statics/uploads/'))
            fs.mkdirSync('./statics/uploads/', {recursive: true});
        cb(null, './statics/uploads/')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        cb(null, name + ".json");
    }
});
let upload = multer({
    storage: storage
});

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
});

router.get('/tutorials', (req, res) => {
    res.render('tutorials.html.twig');
})

router.get('/export-json', (req, res) => {
    db.getAllWorkshops((workshops) => {
        db.getAllCategories((categories) => {
            db.getAllMachines((machines) => {
                db.getAllSections((sections) => {
                    db.getAllParameters((parameters) => {
                        db.getAllSlides((slides) => {
                            let json_export = {}
                            json_export['workshops'] = workshops;
                            json_export['categories'] = categories;
                            json_export['machines'] = machines;
                            json_export['sections'] = sections;
                            json_export['parameters'] = parameters;
                            json_export['slides'] = slides;

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
});

router.post('/import-json', upload.single('import_file'), async (req, res) => {
    let uploaded = "statics/uploads/" + req.files.import_file.name;
    await req.files["import_file"].mv(uploaded);
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
            
            case 'slides':
                for(let k=0; k < json_data[key].length; k++){
                    let insert_data = {};
                    for(let subkey in json_data[key][k]){
                        insert_data[subkey] = json_data[key][k][subkey];
                    }
                    db.addSlide(insert_data, ()=>{});
                }
                break;
        }
    }
    fs.unlinkSync(uploaded);
    res.redirect('/');
});

router.get('/purge-database', (req, res) => {
    // Delete all workshops
    db.getAllWorkshops((ws_list) => {
        ws_list.forEach((workshop) => {
            db.deleteWorkshopById(workshop.workshop_id);
        })
    });
    // Delete all machines
    db.getAllMachines((m_list) => {
        m_list.forEach((machine) => {
            db.deleteMachineById(machine.machine_id);
        })
    });
    // Delete all categories
    db.getAllCategories((cat_list) => {
        cat_list.forEach((category) => {
            db.deleteCategoryById(category.category_id);
        })
    });
    // Delete all parameters
    db.getAllParameters((param_list) => {
        param_list.forEach((parameter) => {
            db.deleteParameterById(parameter.parameter_id);
        })
    });
    // Delete all sections
    db.getAllSections((sec_list) => {
        sec_list.forEach((section) => {
            db.deleteSectionById(section.section_id);
        })
    });
    // Delete all slides
    db.getAllSlides((slides_list) => {
        slides_list.forEach((slide) => {
            db.deleteSlideById(slide.slide_id);
        })
    });

    res.redirect('/settings');
});

module.exports = router;