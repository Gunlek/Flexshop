let sqlite = require('sqlite');
let Promise = require('bluebird').Promise;

class Database {

    constructor(){
        this.dbPromise = sqlite.open('./database/database.sqlite', { Promise });
    }

    /**
     * Récupère les données brutes d'un workshop depuis
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id du workshop à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getWorkshopById(id, callback){
        let db = await this.dbPromise;
        let req_res = Promise.all([
            db.get('SELECT * FROM workshops WHERE workshop_id = ?', [id])
        ]).then((result) => callback(result[0]));
    }

    /**
     * Supprime le workshop correspondant
     * à l'id fourni de la SQL
     * @param {number} id L'id du workshop à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteWorkshopById(id, callback){
        let db = await this.dbPromise;
        Promise.all([
            db.run('DELETE FROM workshops WHERE workshop_id = ?', [id])
        ]).then(() => callback());
    }

    /**
     * Met à jour le workshop avec l'id spécifié dans la SQL
     * @param {number} id L'id du workshop à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateWorkshopById(id, data, callback){
        let db = await this.dbPromise;
        let request = "UPDATE workshops SET ";
        let params_array = [];
        let index = 0;
        for(let k in data){
            request += k;
            request += "=?";

            if(index < Object.keys(data).length - 1)
                request += ", ";
            else
                request += " ";
            
            // The lines above add "key=?, " or "key=?" to the request, depending if it's the last parameter or not

            params_array.push(data[k]);
            index ++;
        }
        request += "WHERE workshop_id = ?"
        params_array.push(id);

        Promise.all([
            db.run(request, params_array)
        ]).then(() => callback());
    }

    /**
     * Récupère la liste de tous les workshops depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllWorkshops(callback){
        let db = await this.dbPromise;
        Promise.all([
            db.all("SELECT * FROM workshops ORDER BY workshop_sort_index")
        ]).then((result) => callback(result[0]));
    }

    /**
     * c
     * @param {json} data Représentation JSON du workshop à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addWorkshop(data, callback){
        let db = await this.dbPromise;
        if(data.hasOwnProperty('workshop_title') && data.hasOwnProperty('workshop_image'))
            Promise.all([
                db.get('SELECT MAX(workshop_sort_index) AS max FROM workshops')
            ]).then((result) => {
                Promise.all([
                    db.run('INSERT INTO workshops(workshop_title, workshop_image, workshop_sort_index) VALUES(?, ?, ?)', [data.workshop_title, data.workshop_image, parseInt(result[0].max)+1])
                ]).then(() => callback(0));
            })
        else
            callback(-1);
    }

    /**
     * Récupère la liste de toutes les machines depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllMachines(callback){
        let db = await this.dbPromise;
        Promise.all([
            db.all("SELECT * FROM machines ORDER BY machine_sort_index")
        ]).then((result) => callback(result[0]));
    }

    /**
     * Récupère les données brutes d'une machine depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la machine à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getMachineById(id, callback){
        let db = await this.dbPromise;
        let req_res = Promise.all([
            db.get('SELECT * FROM machines WHERE machine_id = ?', [id])
        ]).then((result) => callback(result[0]));
    }

    /**
     * Supprime la machine correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la machine à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteMachineById(id, callback){
        let db = await this.dbPromise;
        Promise.all([
            db.run('DELETE FROM machines WHERE machine_id = ?', [id])
        ]).then(() => callback());
    }

    /**
     * Met à jour la machine avec l'id spécifié dans la SQL
     * @param {number} id L'id de la machine à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateMachineById(id, data, callback){
        let db = await this.dbPromise;
        let request = "UPDATE machines SET ";
        let params_array = [];
        let index = 0;
        for(let k in data){
            request += k;
            request += "=?";

            if(index < Object.keys(data).length - 1)
                request += ", ";
            else
                request += " ";
            
            // The lines above add "key=?, " or "key=?" to the request, depending if it's the last parameter or not

            params_array.push(data[k]);
            index ++;
        }
        request += "WHERE machine_id = ?"
        params_array.push(id);

        Promise.all([
            db.run(request, params_array)
        ]).then(() => callback());
    }

    /**
     * Ajoute une machine à la base de donnée
     * @param {json} data Représentation JSON de la machine à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addMachine(data, callback){
        let db = await this.dbPromise;
        if(data.hasOwnProperty('machine_title') && data.hasOwnProperty('machine_category') && data.hasOwnProperty('machine_brand') && data.hasOwnProperty('machine_image') && data.hasOwnProperty('machine_reference'))
            Promise.all([
                db.get('SELECT MAX(machine_sort_index) AS max FROM machines')
            ]).then((result) => {
                Promise.all([
                    db.run('INSERT INTO machines(machine_title, machine_category, machine_brand, machine_image, machine_reference, machine_sort_index) VALUES(?, ?, ?, ?, ?, ?)', [data.machine_title, data.machine_category, data.machine_brand, data.machine_image, data.machine_reference, parseInt(result[0].max)+1])
                ]).then(() => callback(0));
            });
        else
            callback(-1);
    }

    /**
     * Récupère la liste de toutes les sections depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllSections(callback){
        let db = await this.dbPromise;
        Promise.all([
            db.all("SELECT * FROM sections ORDER BY section_sort_index")
        ]).then((result) => {
            let return_value = result[0];
            callback(return_value);
        });
    }

    /**
     * Récupère les données brutes d'une section depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la section à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getSectionById(id, callback){
        let db = await this.dbPromise;
        let req_res = Promise.all([
            db.get('SELECT * FROM sections WHERE section_id = ?', [id]),
            db.all('SELECT * FROM parameters WHERE parameter_section = ?', [id])
        ]).then((result) => {
            let return_value = result[0];
            for(let keyvalue in result[1]) {
                let current_param = result[1][keyvalue];
                return_value[current_param.parameter_name] = current_param.parameter_value;
            }
            callback(return_value)
        });
    }

    /**
     * Supprime la section correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la section à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteSectionById(id, callback){
        let db = await this.dbPromise;
        Promise.all([
            db.run('DELETE FROM sections WHERE section_id = ?', [id])
        ]).then(() => callback());
    }

    /**
     * Met à jour la section avec l'id spécifié dans la SQL
     * @param {number} id L'id de la section à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateSectionById(id, data, callback){
        let db = await this.dbPromise;
        let request = "UPDATE sections SET ";
        let params_array = [];
        let index = 0;
        for(let k in data){
            request += k;
            request += "=?";

            if(index < Object.keys(data).length - 1)
                request += ", ";
            else
                request += " ";
            
            // The lines above add "key=?, " or "key=?" to the request, depending if it's the last parameter or not

            params_array.push(data[k]);
            index ++;
        }
        request += "WHERE section_id = ?"
        params_array.push(id);

        Promise.all([
            db.run(request, params_array)
        ]).then(() => callback());
    }

    /**
     * Ajoute une section à la base de donnée
     * @param {json} data Représentation JSON de la section à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addSection(data, callback){
        let db = await this.dbPromise;
        if(data.hasOwnProperty('section_machine') && data.hasOwnProperty('section_type'))
            Promise.all([
                db.get('SELECT MAX(section_sort_index) AS max FROM sections')
            ]).then((result) => {
                Promise.all([
                    db.run('INSERT INTO sections(section_machine, section_type, section_sort_index) VALUES(?, ?, ?)', [data.section_machine, data.section_type, parseInt(result[0].max)+1])
                ]).then(() => callback(0));
            });
        else
            callback(-1);
    }

    /**
     * Récupère la liste de toutes les catégories depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllCategories(callback){
        let db = await this.dbPromise;
        Promise.all([
            db.all("SELECT * FROM category ORDER BY category_sort_index")
        ]).then((result) => callback(result[0]));
    }

    /**
     * Récupère les données brutes d'une catégorie depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la catégorie à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getCategoryById(id, callback){
        let db = await this.dbPromise;
        let req_res = Promise.all([
            db.get('SELECT * FROM category WHERE category_id = ?', [id])
        ]).then((result) => callback(result[0]));
    }

    /**
     * Supprime la catégorie correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la catégorie à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteCategoryById(id, callback){
        let db = await this.dbPromise;
        Promise.all([
            db.run('DELETE FROM category WHERE category_id = ?', [id])
        ]).then(() => callback());
    }

    /**
     * Met à jour la catégorie avec l'id spécifié dans la SQL
     * @param {number} id L'id de la catégorie à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateCategoryById(id, data, callback){
        let db = await this.dbPromise;
        let request = "UPDATE category SET ";
        let params_array = [];
        let index = 0;
        for(let k in data){
            request += k;
            request += "=?";

            if(index < Object.keys(data).length - 1)
                request += ", ";
            else
                request += " ";
            
            // The lines above add "key=?, " or "key=?" to the request, depending if it's the last parameter or not

            params_array.push(data[k]);
            index ++;
        }
        request += "WHERE category_id = ?"
        params_array.push(id);

        Promise.all([
            db.run(request, params_array)
        ]).then(() => callback());
    }

    /**
     * Ajoute une catégorie à la base de donnée
     * @param {json} data Représentation JSON de la catégorie à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addCategory(data, callback){
        let db = await this.dbPromise;
        if(data.hasOwnProperty('category_title') && data.hasOwnProperty('category_workshop'))
            Promise.all([
                db.get('SELECT MAX(category_sort_index) AS max FROM categories')
            ]).then((result) => {
                Promise.all([
                    db.run('INSERT INTO category(category_title, category_workshop, category_sort_index) VALUES(?, ?, ?)', [data.category_title, data.category_workshop, parseInt(result[0].max)+1])
                ]).then(() => callback(0));
            });
        else
            callback(-1);
    }

    /**
     * Récupère la liste de tous les paramètres depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllParameters(callback){
        let db = await this.dbPromise;
        Promise.all([
            db.all("SELECT * FROM parameters ORDER BY parameter_sort_index")
        ]).then((result) => callback(result[0]));
    }

    /**
     * Récupère les données brutes d'un paramèrte depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id du paramètre à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getParametersForSectionId(id, callback){
        let db = await this.dbPromise;
        let req_res = Promise.all([
            db.get('SELECT * FROM parameters WHERE parameter_section = ?', [id])
        ]).then((result) => callback(result[0]));
    }

    /**
     * Supprime le paramètre correspondant
     * à l'id fourni de la SQL
     * @param {number} id L'id du paramètre à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteParameterById(id, callback){
        let db = await this.dbPromise;
        Promise.all([
            db.run('DELETE FROM parameters WHERE parameter_id = ?', [id])
        ]).then(() => callback());
    }

    /**
     * Met à jour le paramètre avec l'id spécifié dans la SQL
     * @param {number} id L'id du paramètre à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateParametersById(id, data, callback){
        let db = await this.dbPromise;
        let request = "UPDATE parameters SET ";
        let params_array = [];
        let index = 0;
        for(let k in data){
            request += k;
            request += "=?";

            if(index < Object.keys(data).length - 1)
                request += ", ";
            else
                request += " ";
            
            // The lines above add "key=?, " or "key=?" to the request, depending if it's the last parameter or not

            params_array.push(data[k]);
            index ++;
        }
        request += "WHERE parameter_id = ?"
        params_array.push(id);

        Promise.all([
            db.run(request, params_array)
        ]).then(() => callback());
    }

    /**
     * Ajoute un paramètre à la base de donnée
     * @param {json} data Représentation JSON du paramètre à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addParameter(data, callback){
        let db = await this.dbPromise;
        if(data.hasOwnProperty('parameter_section') && data.hasOwnProperty('parameter_name') && data.hasOwnProperty('parameter_value'))
            Promise.all([
                db.get('SELECT MAX(parameter_sort_index) AS max FROM parameters')
            ]).then((result) => {
                Promise.all([
                    db.run('INSERT INTO parameters(parameter_section, parameter_name, parameter_value, parameter_sort_index) VALUES(?, ?, ?, ?)', [data.parameter_section, data.parameter_name, data.parameter_value, parseInt(result[0].max)+1])
                ]).then(() => callback(0));
            });
        else
            callback(-1);
    }

    /**
     * Créé une nouvelle entrée workshop dans la base
     * de données en fonction du json fourni
     * @param {json} workshop_data Tableau json représentant le workshop à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewWorkshop(workshop_data, callback=()=>{}){
        let data_arr = [
            workshop_data.workshop_title,
            workshop_data.workshop_image
        ];
        this.addWorkshop(data_arr, callback);
    }

    /**
     * Créé une nouvelle entrée category dans la base
     * de données en fonction du json fourni
     * @param {json} category_data Tableau json représentant la categorie à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewCategory(category_data, callback=()=>{}){
        let data_arr = [
            category_data.category_title,
            category_data.category_workshop
        ];
        this.addCategory(data_arr, callback);
    }

    /**
     * Créé une nouvelle entrée machine dans la base
     * de données en fonction du json fourni
     * @param {json} machine_data Tableau json représentant la machine à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewMachine(machine_data, callback=()=>{}){
        let data_arr = [
            machine_data.machine_title,
            machine_data.machine_category,
            machine_data.machine_brand,
            machine_data.machine_image,
            machine_data.machine_reference
        ];
        this.addMachine(data_arr, callback);
    }

    /**
     * Créé une nouvelle entrée section dans la base
     * de données en fonction du json fourni
     * @param {json} machine_data Tableau json représentant la section à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewSection(section_data, callback=()=>{}){
        let data_arr = [
            section_data.section_machine,
            section_data.section_type
        ];
        this.addSection(data_arr, callback);
    }

    /**
     * Migre les bases de données
     * /!\ Migration forcée => Effectue la migration
     * en effaçant les données !
     */
    migrate(){
        let dbPromise = Promise.resolve()
            .then(() => sqlite.open('../database/database.sqlite', { Promise }))
            .then(db => db.migrate({ force: 'last' }));
    }

}

/**
 * Build a Singleton structure for the Database class
 * @this DatabaseSingleton
 */
class DatabaseSingleton {
    constructor(){
        if(!DatabaseSingleton.instance){
            DatabaseSingleton.instance = new Database();
        }
    }

    getInstance(){
        return DatabaseSingleton.instance;
    }
}

module.exports = DatabaseSingleton;