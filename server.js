// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';

import fetch from 'node-fetch';
import sqlite3 from 'sqlite3';
//import {databaseinit} from './sqlmaker.js';
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
async function dataBaseStart(dbSettings){
  try{
    const db = await open(dbSettings);
    await db.exec(`CREATE TABLE IF NOT EXISTS FoodDB(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      store_name TEXT,
      category TEXT)
      `)
    const data = await foodDataFetcher();
    data.forEach((entry) => {intodb(entry)});
    const test = await db.get('SELECT * FROM FoodDB')
    console.log(test);
  }
  catch(e){
    console.log("Error")
  }
}
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
//
app.route('/sql')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    const db = await dataBaseStart(dbSettings); //Creating DB
    results = await query(db);
    res.json(results)
  });
//
async function foodDataFetcher() {
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const data = await fetch(url);
  return data.json()
}

async function intodb(entry){
  try{
    const store_name = entry.name;
    const category = entry.category;
    await db.exec(`INSERT INTO FoodDB(store_name, category) VALUES ("$(store_name)","$(category)")`);
    console.log(`${restaurant_name} and ${category} inserted`);
  }
  catch(e) {
		console.log('Error on insertion');
		console.log(e);
		}
}

async function query(db){
  const result = await db.all(`SELECT category, COUNT(store_name) from FoodDB GROUP BY category`);
  return result;
}