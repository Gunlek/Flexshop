exports.deleteWorkshop = function(req, res, db){
    _deleteWorkshop(req.params.id, db, res, true);
}

exports.deleteCategory = function(req, res, db){
    _deleteCategory(req.params.id, db, res, true);
}

exports.deleteMachine = function(req, res, db){
    _deleteMachine(req.params.id, db, res, true);
}

exports.deleteSection = function(req, res, db) {
    _deleteSection(req.params.id, db, res, true);
}

exports.deleteParameter = function(req, res, db) {
    _deleteParameter(req.params.id, db, res, true);
}

function _deleteWorkshop(workshop_id, db, res, send_response){
    db.getAllCategories((categories) => {
        categories.forEach((category) => {
            if(parseInt(category['category_workshop']) == parseInt(workshop_id))
                _deleteCategory(category['category_id'], db, res, false);
        });

        db.deleteWorkshopById(workshop_id, () => {
            if(send_response)
                res.sendStatus(200);
        });
    });
}

function _deleteCategory(category_id, db, res, send_response){
    db.getAllMachines((machines) => {
        machines.forEach((machine) => {
            if(parseInt(machine['machine_category']) == parseInt(category_id))
                _deleteMachine(machine['machine_id'], db, res, false);
        });

        db.deleteCategoryById(category_id, () => {
            if(send_response)
                res.sendStatus(200);
        });
    });
}

function _deleteMachine(machine_id, db, res, send_response){
    db.getAllSections((sections) => {
        sections.forEach((section) => {
            if(parseInt(section['section_machine']) == parseInt(machine_id))
                _deleteSection(section['section_id'], db, res, false);
        });

        db.deleteMachineById(machine_id, () => {
            if(send_response)
                res.sendStatus(200);
        });
    });
}

function _deleteSection(section_id, db, res, send_response){
    db.getAllParameters((parameters) => {
        parameters.forEach((parameter) => {
            if(parseInt(parameter['parameter_section']) == parseInt(section_id))
                _deleteParameter(parameter['parameter_id'], db, res, false);
        });

        db.deleteSectionById(section_id, () => {
            if(send_response)
                res.sendStatus(200);
        });
    });
}

function _deleteParameter(parameter_id, db, res, send_response){
    db.deleteParameterById(parameter_id, () => {
        if(send_response)
            res.sendStatus(200);
    });
}