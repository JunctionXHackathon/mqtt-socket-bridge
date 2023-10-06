const mqtt = require('mqtt')
const {parseTopic} = require("./parser/topic-parser")

const port = process.env.PORT || 3001;

const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://13.38.173.241:1883"


const server = require('http').createServer();
const io = require('socket.io')(server);

const mqttClient = mqtt.connect(MQTT_BROKER)

mqttClient.on("connect", () => {
    console.log("connected to MQTT")
    mqttClient.subscribe("#")



})



mqttClient.on("message", (topic, payload) => {
    // console.log(topic)
    // console.log(payload.toString())

    const parsed = parseTopic(topic, payload.toString())

    io.sockets.emit("msg", parsed)

    // console.log(parsed)

})


io.on('connection', client => {
    client.on('event', data => { /* … */ });
    client.on('disconnect', () => { /* … */ });
});


server.listen(port);


