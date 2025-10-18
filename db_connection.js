const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost';
const client = new MongoClient(url);

const dbName = 'senai_teste';
const collectionName = "teste";

let singleton

async function connect() {
    if (singleton) return singleton;
    
    const client = new MongoClient(url)
    await client.connect(); 
    
    singleton = client.db(dbName);
    return singleton;
}

async function findAll() {
    const db = await connect();
    return db.collection(collectionName).find()
}

module.exports = { findAll }



