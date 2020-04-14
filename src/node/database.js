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
            db.all("SELECT * FROM workshops")
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
                db.run('INSERT INTO workshops(workshop_title, workshop_image) VALUES(?, ?)', [data.workshop_title, data.workshop_image])
            ]).then(() => callback(0));
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
            db.all("SELECT * FROM machines")
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
                db.run('INSERT INTO machines(machine_title, machine_category, machine_brand, machine_image, machine_reference) VALUES(?, ?)', [data.machine_title, data.machine_category, data.machine_brand, data.machine_image, data.machine_reference])
            ]).then(() => callback(0));
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
            db.all("SELECT * FROM sections")
        ]).then((result) => callback(result[0]));
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
            db.get('SELECT * FROM sections WHERE section_id = ?', [id])
        ]).then((result) => callback(result[0]));
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
        if(data.hasOwnProperty('section_machine') && data.hasOwnProperty('section_type') && data.hasOwnProperty('section_title') && data.hasOwnProperty('section_description'))
            Promise.all([
                db.run('INSERT INTO sections(section_machine, section_type, section_title, section_description) VALUES(?, ?)', [data.section_machine, data.section_type, data.section_title, data.section_description])
            ]).then(() => callback(0));
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
            db.all("SELECT * FROM category")
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
                db.run('INSERT INTO category(category_title, category_workshop) VALUES(?, ?)', [data.category_title, data.category_workshop])
            ]).then(() => callback(0));
        else
            callback(-1);
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