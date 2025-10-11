const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://127.0.0.1:1883");

// Abre a conexão com o broker
client.on("connect", () => {
  // Se inscreve e publica no tópico presence
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

//Recebe as mensagens dos tópicos que o cliente é incristo
client.on("message", (topic, message) => {
  console.log("Mensagem recebida:", message.toString());
  // Sem client.end() - a função não é finalizada. 
});
