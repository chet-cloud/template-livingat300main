const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db');
const {loadPosts} = require('../lib/data.js')

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");
    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    loadPosts().forEach(p=>{
        stmt.run(JSON.stringify(p));
    })
    stmt.finalize();
    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

db.close();