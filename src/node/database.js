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

        return req_res;
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

            if(index < data.length)
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