import sqlite3 from 'sqlite3';
export function databaseinit(dbSettings){
    const DB = new sqlite3.Database(dbSettings.filename, function(err){
      if (err) {
          console.log(err)
          return
      }
      console.log('Connected to ' + dbSettings.filename + ' database.')
    });
    //end of const DB
    DB.exec('PRAGMA foreign_keys = ON;', function(error){
      if (error){
          console.error("Pragma statement didn't work.")
      } else {
          console.log("Foreign Key Enforcement is on.")
      }
    });
    //end of DB.exec foreign keys
    const dbschem = `CREATE TABLE IF NOT EXISTS Food(
                      name TEXT NOT NULL,
                      category TEXT NOT NULL, 
                      inspection_date TEXT NOT NULL, 
                      inspection_results TEXT NOT NULL, 
                      city TEXT NOT NULL, 
                      state TEXT NOT NULL, 
                      zip TEXT NOT NULL, 
                      owner TEXT NOT NULL, 
                      type TEXT NOT NULL);`
    DB.exec(dbschem,function(err){
      if (err){
        console.log(err)
      }
    });
    //end of dbschem
  };