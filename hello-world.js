const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org/");

// Abre a conexão com o broker
client.on("connect", () => {
  // Se inscreve e publica no tópico presence
  client.subscribe("iot/umidade/sala01");
  client.subscribe("iot/temperatura/sala01");
});

//Recebe as mensagens dos tópicos que o cliente é incristo
client.on("message", (topic, message) => {
  console.log("Mensagem recebida:", message.toString());
  // Sem client.end() - a função não é finalizada. 
});
