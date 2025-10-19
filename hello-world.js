const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org/");
const db = require('./db_connection');

//inscricao nos topicos para receber publicacoes
client.subscribe("iot/umidade/sala01");
client.subscribe("iot/temperatura/sala01");

//var que sera enviada como parametro de insercao
let insertDoc = {};

//loop que aguarda por mensagens publicadas no topicos que esta inscrita
client.on("message", (topic, message) => {
    insertDoc.sensor = "sala1";
    //verificar se insertDoc é iniciada
    console.log(insertDoc);
    
    //recebe e prepara as mensagens dos topicos
    const data = JSON.parse(message.toString());
    console.log(topic);
    console.log(data);
    console.log("______");
    
    //insere os dados de temperatura e umidade no documento que sera gravado no banco
    if (topic.includes('temperatura')) {
      insertDoc.temperatura = data.temperatura;
    } else if (topic.includes('umidade')) {
      insertDoc.umidade = data.umidade;
    }
        
        //Se o documento possui temp e umi executa a inserção no db e limpa o doc para uma proxima leitura
    if (insertDoc.temperatura !== undefined && insertDoc.umidade !== undefined) {
      insertDoc.timestamp = new Date().toISOString();
      db.insert(insertDoc);
      insertDoc = {};
    }
});
