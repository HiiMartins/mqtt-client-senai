const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'senai';

async function main() {
    await client.connect();
    console.log('conectado com sucesso ao servidor');
    const db = client.db(dbName);
    const collection = db.collection('leituras');
    return 'feito.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
