const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // Sem client.end() - ficaria executando para sempre
  console.log("Mensagem recebida:", message.toString());
  // O script não termina, continua ouvindo novas mensagens
});
