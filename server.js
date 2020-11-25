// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
//import express, { response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import sqlite3 from 'sqlite3';
import {databaseinit} from './sqlmaker.js';
//
dotenv.config();
const app = express();
const port = process.env.PORT || 3002;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
//
const dbSettings = {
  filename:'./tmp/database.db',
  driver: sqlite3.Database,
};
const db = databaseinit(dbSettings);
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
    //console.log('Form data in res.body', req.body);
    res.json(json);
  });
/*/
 app.route('/sql')
    .get((req,res) => {
      console.log('sql GET')
    })
    .post(async (req,res) =>{
      console.log('sql POST');
  })
/*/
function foodfetcher(){
  const foodapi = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  const data = fetch(foodapi);
  console.log(data)
}
//foodfetcher()
//



//end init
