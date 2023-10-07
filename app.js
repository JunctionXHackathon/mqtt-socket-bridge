const mqtt = require('mqtt')
const {parseTopic} = require("./parser/topic-parser")
const {throttle} = require("lodash");

const port = process.env.PORT || 3001;

const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://13.38.173.241:1883"


const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const mqttClient = mqtt.connect(MQTT_BROKER)

mqttClient.on("connect", () => {
    console.log("connected to MQTT")
    mqttClient.subscribe("uav1/#")
    mqttClient.subscribe("uav2/#")



})


const throttledEmit = throttle((parsed)=>{
    io.sockets.emit("msg", parsed)
}, 50)



mqttClient.on("message", (topic, payload) => {
    // console.log(topic)
    // console.log(payload.toString())

    const parsed = parseTopic(topic, payload.toString())

    throttledEmit(parsed)

    // console.log(parsed)

})


io.on('connection', client => {
    client.on('event', data => { /* … */ });
    client.on('disconnect', () => { /* … */ });
});


server.listen(port);


