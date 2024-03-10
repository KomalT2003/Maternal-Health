//important
//md5 -> for storing passwords
//.verbose() => extra info for debugging
var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Doctors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            phone text, 
            speciality text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("Doctors table already created")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO Doctors (name, email, phone, speciality) VALUES (?,?,?,?)'
                db.run(insert, ["Maria","maria@kem.com",9326227834, "Pediatrician"])
                db.run(insert, ["Farah","farah123@gmail.com",9819140896, "Gynecologist"])
                console.log("Doctors table created")
            }
        });  
    }
});


module.exports = db