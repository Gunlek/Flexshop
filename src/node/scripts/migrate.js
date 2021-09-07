let sqlite = require('sqlite');
let sqlite3 = require('sqlite3-offline');
let Promise = require('bluebird').Promise;
let fs = require('fs');

if(!fs.existsSync("./database"))
    fs.mkdirSync("./database", {recursive: true});

sqlite.open({
    filename: './database/database.sqlite',
    driver: sqlite3.Database
}).then(db => db.migrate({ force: 'last' }));