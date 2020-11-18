// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express, { response } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
/*import sqlite from 'sqlite';*/
import sqlite3 from 'sqlite3';
//
dotenv.config();
//
const app = express();
const port = process.env.PORT || 3002;
//const DB_PATH = ':memory:'
//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//
app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    
    console.log('fetch data',json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('Form data in res.body', req.body);
    res.json(json);
  });
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
//
app.route('/sql')
  .get((req, res) => {
    console.log('GET request detected');
    console.log('fetch data',json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    const foodjson  = new Array(); 
    foodfetcher()
    console.log(foodjson)
    //datainput(foodjson)
    //const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    //const json = await data.json();
    //console.log('Form data in res.body', req.body);
    res.json(json);
});;
//
function databaseinit(){
const dbSettings = {
  filename:'./tmp/database.db',
  driver: sqlite3.Database,
};
const DB = new sqlite3.Database(dbSettings.filename, function(err){
  if (err) {
      console.log(err)
      return
  }
  console.log('Connected to ' + dbSettings.filename + ' database.')
});
  //
  DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
    if (error){
        console.error("Pragma statement didn't work.")
    } else {
        console.log("Foreign Key Enforcement is on.")
    }
  });
  //
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
};
///
databaseinit()
///
function foodfetcher(){
  fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    .then(response => response.json())
    .then(data => foodjson.push(...data))  
    }
  
function datainput(){

}