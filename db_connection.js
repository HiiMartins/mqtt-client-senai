const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost';
const client = new MongoClient(url);

const dbName = 'teste';

async function main(params) {
    await client.connect();
    console.log('conectado com sucesso ao servidor');
    const db = client.db(dbName);
    const collection = db.collection('teste');
    
    const insertResult = await collection.insertOne(params);
    console.log('Documentos inseridos =>', insertResult);
    
    const findResult = await collection.find({}).toArray();
    console.log('Documentos encontrados =>', findResult);

    return 'feito.';
}

main(params)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
