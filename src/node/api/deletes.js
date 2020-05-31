exports.deleteWorkshop = function(req, res, db){
    _deleteWorkshop(req.params.id, db, res);
    res.sendStatus(200);
}

exports.deleteCategory = function(req, res, db){
    _deleteCategory(req.params.id, db, res);
    res.sendStatus(200);
}

exports.deleteMachine = function(req, res, db){
    _deleteMachine(req.params.id, db, res);
    res.sendStatus(200);
}

exports.deleteSection = function(req, res, db) {
    _deleteSection(req.params.id, db, res);
    res.sendStatus(200);
}

exports.deleteParameter = function(req, res, db) {
    _deleteParameter(req.params.id, db, res);
    res.sendStatus(200);
}

function _deleteWorkshop(workshop_id, db, res){
    db.getAllCategories((categories) => {
        categories.forEach((category) => {
            if(parseInt(category['category_workshop']) == parseInt(workshop_id))
                _deleteCategory(category['category_id'], db, res);
        });

        db.deleteWorkshopById(workshop_id, () => {});
    });
}

function _deleteCategory(category_id, db, res){
    db.getAllMachines((machines) => {
        machines.forEach((machine) => {
            if(parseInt(machine['machine_category']) == parseInt(category_id))
                _deleteMachine(machine['machine_id'], db, res);
        });

        db.deleteCategoryById(category_id, () => {});
    });
}

function _deleteMachine(machine_id, db, res){
    db.getAllSections((sections) => {
        sections.forEach((section) => {
            if(parseInt(section['section_machine']) == parseInt(machine_id))
                _deleteSection(section['section_id'], db, res);
        });

        db.deleteMachineById(machine_id, () => {});
    });
}

function _deleteSection(section_id, db, res){
    db.getAllParameters((parameters) => {
        parameters.forEach((parameter) => {
            if(parseInt(parameter['parameter_section']) == parseInt(section_id))
                _deleteParameter(parameter['parameter_id'], db, res);
        });

        db.deleteSectionById(section_id, () => {});
    });
}

function _deleteParameter(parameter_id, db, res){
    db.deleteParameterById(parameter_id, () => {});
}