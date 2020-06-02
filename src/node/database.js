let sqlite = require('sqlite');
let sqlite3 = require('sqlite3');

class Database {

    constructor(){
        this.open();
    }

    async open(){
        this.db = await sqlite.open({
            filename: './database/database.sqlite',
            driver: sqlite3.Database
        });
    }

    close(){
        this.db.close();
    }

    /**
     * Récupère les données brutes d'un workshop depuis
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id du workshop à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getWorkshopById(id, callback){
        await this.open();
        let db = this.db;
        let result = await db.get('SELECT * FROM workshops WHERE workshop_id = ?', [id]);
        callback(result);
        this.close();
    }

    /**
     * Supprime le workshop correspondant
     * à l'id fourni de la SQL
     * @param {number} id L'id du workshop à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteWorkshopById(id, callback){
        await this.open();
        let db = this.db;
        await db.run('DELETE FROM workshops WHERE workshop_id = ?', [id]);
        callback();
        this.close();
    }

    /**
     * Met à jour le workshop avec l'id spécifié dans la SQL
     * @param {number} id L'id du workshop à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateWorkshopById(id, data, callback){
        await this.open();
        let db = this.db;
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

        await db.run(request, params_array)
        callback();
        this.close();
    }

    /**
     * Récupère la liste de tous les workshops depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllWorkshops(callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM workshops ORDER BY workshop_sort_index")
        callback(result);
        this.close();
    }

    /**
     * Ajoute un workshop à la base de donnée
     * @param {json} data Représentation JSON du workshop à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addWorkshop(data, callback){
        await this.open();
        let db = this.db;
        if(data.hasOwnProperty('workshop_title') && data.hasOwnProperty('workshop_image'))
        {
            let result = await db.get('SELECT MAX(workshop_sort_index) AS max FROM workshops');
            await db.run('INSERT INTO workshops(workshop_title, workshop_image, workshop_sort_index) VALUES(?, ?, ?)', [data.workshop_title, data.workshop_image, parseInt(result.max)+1])
            callback(0);
            this.close();
        }
        else {
            callback(-1);
            this.close();
        }
    }

    /**
     * Récupère la liste de toutes les machines depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllMachines(callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM machines ORDER BY machine_sort_index");
        callback(result);
        this.close();
    }

    /**
     * Récupère les données brutes d'une machine depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la machine à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getMachineById(id, callback){
        await this.open();
        let db = this.db;
        let result = await db.get('SELECT * FROM machines WHERE machine_id = ?', [id]);
        callback(result);
        this.close();
    }

    /**
     * Supprime la machine correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la machine à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteMachineById(id, callback){
        await this.open();
        let db = this.db;
        await db.run('DELETE FROM machines WHERE machine_id = ?', [id]);
        callback();
        this.close();
    }

    /**
     * Met à jour la machine avec l'id spécifié dans la SQL
     * @param {number} id L'id de la machine à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateMachineById(id, data, callback){
        await this.open();
        let db = this.db;
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

        await db.run(request, params_array);
        callback();
        this.close();
    }

    /**
     * Ajoute une machine à la base de donnée
     * @param {json} data Représentation JSON de la machine à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addMachine(data, callback){
        await this.open();
        let db = this.db;
        if(data.hasOwnProperty('machine_title') && data.hasOwnProperty('machine_category') && data.hasOwnProperty('machine_brand') && data.hasOwnProperty('machine_image') && data.hasOwnProperty('machine_reference'))
        {
            let result = await db.get('SELECT MAX(machine_sort_index) AS max FROM machines');
            db.run('INSERT INTO machines(machine_title, machine_category, machine_brand, machine_image, machine_reference, machine_sort_index) VALUES(?, ?, ?, ?, ?, ?)', [data.machine_title, data.machine_category, data.machine_brand, data.machine_image, data.machine_reference, parseInt(result.max)+1])
            callback(0);
            this.close();
        }
        else {
            callback(-1);
            this.close();
        }
    }

    /**
     * Récupère la liste de toutes les sections depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllSections(callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM sections ORDER BY section_sort_index");
        let return_value = result;
        callback(return_value);
        this.close();
    }

    /**
     * Récupère les données brutes d'une section depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la section à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getSectionById(id, callback){
        await this.open();
        let db = this.db;
        let sections = await db.get('SELECT * FROM sections WHERE section_id = ?', [id]);
        let parameters = db.all('SELECT * FROM parameters WHERE parameter_section = ?', [id]);
        let return_value = sections;
        for(let keyvalue in parameters) {
            let current_param = parameters[keyvalue];
            return_value[current_param.parameter_name] = current_param.parameter_value;
        }
        callback(return_value);
        this.close();
    }

    /**
     * Supprime la section correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la section à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteSectionById(id, callback){
        await this.open();
        let db = this.db;
        await db.run('DELETE FROM sections WHERE section_id = ?', [id])
        callback();
        this.close();
    }

    /**
     * Met à jour la section avec l'id spécifié dans la SQL
     * @param {number} id L'id de la section à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateSectionById(id, data, callback){
        await this.open();
        let db = this.db;
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

        await db.run(request, params_array)
        callback();
        this.close();
    }

    /**
     * Ajoute une section à la base de donnée
     * @param {json} data Représentation JSON de la section à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addSection(data, callback){
        await this.open();
        let db = this.db;
        if(data.hasOwnProperty('section_machine') && data.hasOwnProperty('section_type'))
        {
            let result = await db.get('SELECT MAX(section_sort_index) AS max FROM sections');
            await db.run('INSERT INTO sections(section_machine, section_type, section_sort_index) VALUES(?, ?, ?)', [data.section_machine, data.section_type, parseInt(result.max)+1])
            callback(0);
            this.close();
        }
        else {
            callback(-1);
            this.close();
        }
    }

    /**
     * Récupère la liste de toutes les catégories depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllCategories(callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM category ORDER BY category_sort_index")
        callback(result);
        this.close();
    }

    /**
     * Récupère les données brutes d'une catégorie depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la catégorie à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getCategoryById(id, callback){
        await this.open();
        let db = this.db;
        let result = await db.get('SELECT * FROM category WHERE category_id = ?', [id])
        callback(result);
        this.close();
    }

    /**
     * Supprime la catégorie correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la catégorie à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteCategoryById(id, callback){
        await this.open();
        let db = this.db;
        await db.run('DELETE FROM category WHERE category_id = ?', [id])
        callback();
        this.close();
    }

    /**
     * Met à jour la catégorie avec l'id spécifié dans la SQL
     * @param {number} id L'id de la catégorie à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateCategoryById(id, data, callback){
        await this.open();
        let db = this.db;
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

        await db.run(request, params_array)
        callback();
        this.close();
    }

    /**
     * Ajoute une catégorie à la base de donnée
     * @param {json} data Représentation JSON de la catégorie à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addCategory(data, callback){
        await this.open();
        let db = this.db;
        if(data.hasOwnProperty('category_title') && data.hasOwnProperty('category_workshop')){
            let result = await db.get('SELECT MAX(category_sort_index) AS max FROM category');
            db.run('INSERT INTO category(category_title, category_workshop, category_sort_index) VALUES(?, ?, ?)', [data.category_title, data.category_workshop, parseInt(result.max)+1])
            callback(0);
            this.close();
        }
        else {
            callback(-1);
            this.close();
        }
    }

    /**
     * Récupère la liste de tous les paramètres depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllParameters(callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM parameters ORDER BY parameter_sort_index");
        callback(result);
        this.close();
    }

    /**
     * Récupère les données brutes d'un paramèrte depuis 
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id du paramètre à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getParametersForSectionId(id, callback){
        await this.open();
        let db = this.db;
        let result = await db.get('SELECT * FROM parameters WHERE parameter_section = ?', [id]);
        callback(result);
        this.close();
    }

    /**
     * Supprime le paramètre correspondant
     * à l'id fourni de la SQL
     * @param {number} id L'id du paramètre à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteParameterById(id, callback){
        await this.open();
        let db = this.db;
        await db.run('DELETE FROM parameters WHERE parameter_id = ?', [id]);
        callback();
        this.close();
    }

    /**
     * Met à jour le paramètre avec l'id spécifié dans la SQL
     * @param {number} id L'id du paramètre à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateParametersById(id, data, callback){
        await this.open();
        let db = this.db;
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

        await db.run(request, params_array);
        callback();
        this.close();
    }

    /**
     * Ajoute un paramètre à la base de donnée
     * @param {json} data Représentation JSON du paramètre à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addParameter(data, callback){
        await this.open();
        let db = this.db;
        if(data.hasOwnProperty('parameter_section') && data.hasOwnProperty('parameter_name') && data.hasOwnProperty('parameter_value'))
        {
            let result = await db.get('SELECT MAX(parameter_sort_index) AS max FROM parameters');
            await db.run('INSERT INTO parameters(parameter_section, parameter_name, parameter_value, parameter_sort_index) VALUES(?, ?, ?, ?)', [data.parameter_section, data.parameter_name, data.parameter_value, parseInt(result.max)+1])
            callback(0);
            this.close();
        }
        else {
            callback(-1);
            this.close();
        }
    }

    /**
     * Récupère les données brutes d'une slide depuis
     * la SQL en fonction de l'id fourni
     * @param {number} id L'id de la slide à récupérer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getSlideById(id, callback){
        await this.open();
        let db = this.db;
        let result = await db.get('SELECT * FROM slides WHERE slide_id = ?', [id])
        callback(result);
        this.close();
    }

    /**
     * Supprime la slide correspondante
     * à l'id fourni de la SQL
     * @param {number} id L'id de la slide à supprimer
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async deleteSlideById(id, callback){
        await this.open();
        let db = this.db;
        await db.run('DELETE FROM slides WHERE slide_id = ?', [id])
        callback();
        this.close();
    }

    /**
     * Met à jour la slide avec l'id spécifié dans la SQL
     * @param {number} id L'id de la slide à mettre à jour
     * @param {json} data JSon contenant les champs à mettre à jour et leurs nouvelles valeurs
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async updateSlideById(id, data, callback){
        await this.open();
        let db = this.db;
        let request = "UPDATE slides SET ";
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
        request += "WHERE slide_id = ?"
        params_array.push(id);

        await db.run(request, params_array)
        callback();
        this.close();
    }

    /**
     * Récupère la liste de toutes les slides depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getAllSlides(callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM slides");
        callback(result);
        this.close();
    }

    /**
     * Récupère la liste de toutes les slides depuis la SQL
     * @param {function} callback La fonction callback à appeler quand la requête SQL a abouti
     */
    async getMachineSlides(id, callback){
        await this.open();
        let db = this.db;
        let result = await db.all("SELECT * FROM slides WHERE slide_machine=?", [id]);
        callback(result);
        this.close();
    }

    /**
     * c
     * @param {json} data Représentation JSON de la slide à ajouter
     * @param {function} callback La fonction callbacak à appeler quand la requête SQL a abouti
     */
    async addSlide(data, callback){
        await this.open();
        let db = this.db;
        if(data.hasOwnProperty('slide_number') && data.hasOwnProperty('slide_machine') && data.hasOwnProperty('slide_title') && data.hasOwnProperty('slide_image') && data.hasOwnProperty('slide_description'))
        {
            await db.run('INSERT INTO slides(slide_number, slide_machine, slide_title, slide_image, slide_description) VALUES(?, ?, ?, ?, ?)', [data.slide_number, data.slide_machine, data.slide_title, data.slide_image, data.slide_description]);
            callback(0);
            this.close();
        }
        else {
            callback(-1);
            this.close();
        }
    }

        /**
     * Créé une nouvelle entrée workshop dans la base
     * de données en fonction du json fourni
     * @param {json} workshop_data Tableau json représentant le workshop à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewWorkshop(workshop_data, callback=()=>{}){
        await this.open();
        let db = this.db;
        let data_arr = [];
        let update_str = "";
        let values_str = "";
        for(let key in workshop_data){
            data_arr.push(workshop_data[key]);
            update_str += key.toString() + ", ";
            values_str += "?" + ", ";
        }
        update_str = update_str.substring(0, update_str.length-2);
        values_str = values_str.substring(0, values_str.length-2);
        await db.run('INSERT INTO workshops('+update_str+') VALUES('+values_str+')', data_arr);
        callback();
        this.close();
    }

    /**
     * Créé une nouvelle entrée category dans la base
     * de données en fonction du json fourni
     * @param {json} category_data Tableau json représentant la categorie à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewCategory(category_data, callback=()=>{}){
        await this.open();
        let db = this.db;
        let data_arr = [];
        let update_str = "";
        let values_str = "";
        for(let key in category_data){
            data_arr.push(category_data[key]);
            update_str += key.toString() + ", ";
            values_str += "?" + ", ";
        }
        update_str = update_str.substring(0, update_str.length-2);
        values_str = values_str.substring(0, values_str.length-2);
        await db.run('INSERT INTO category('+update_str+') VALUES('+values_str+')', data_arr);
        callback();
        this.close();
    }

    /**
     * Créé une nouvelle entrée machine dans la base
     * de données en fonction du json fourni
     * @param {json} machine_data Tableau json représentant la machine à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewMachine(machine_data, callback=()=>{}){
        await this.open();
        let db = this.db;
        let data_arr = [];
        let update_str = "";
        let values_str = "";
        for(let key in machine_data){
            data_arr.push(machine_data[key]);
            update_str += key.toString() + ", ";
            values_str += "?" + ", ";
        }
        update_str = update_str.substring(0, update_str.length-2);
        values_str = values_str.substring(0, values_str.length-2);
        await db.run('INSERT INTO machines('+update_str+') VALUES('+values_str+')', data_arr);
        callback();
        this.close();
    }

    /**
     * Créé une nouvelle entrée section dans la base
     * de données en fonction du json fourni
     * @param {json} machine_data Tableau json représentant la section à créer
     * @param {function} callback La fonction callback à appeler quand la requête a abouti
     */
    async createNewSection(section_data, callback=()=>{}){
        await this.open();
        let db = this.db;
        let data_arr = [];
        let update_str = "";
        let values_str = "";
        for(let key in section_data){
            data_arr.push(section_data[key]);
            update_str += key.toString() + ", ";
            values_str += "?" + ", ";
        }
        update_str = update_str.substring(0, update_str.length-2);
        values_str = values_str.substring(0, values_str.length-2);
        await db.run('INSERT INTO sections('+update_str+') VALUES('+values_str+')', data_arr);
        callback();
        this.close();
    }

    /**
     * Migre les bases de données
     * /!\ Migration forcée => Effectue la migration
     * en effaçant les données !
     */
    migrate(){
        sqlite.open({
            filename: '../database/database.sqlite',
            driver: sqlite3.Database
        })
        .then(db => db.migrate({ force: 'last' }))
        .then(() => this.close());
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