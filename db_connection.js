const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost';
const client = new MongoClient(url)

//pontuar sobre a forma de criação da base de dados e collection
const dbName = 'senai';
const collectionName = "leituras";

let singleton;

async function connect() {
    if (singleton) return singleton;
    
    await client.connect(); 
    singleton = client.db(dbName);
    return singleton;
}

async function insert(params) {
    const db = await connect();
    return db.collection(collectionName).insertOne(params);
}

module.exports = { insert };
