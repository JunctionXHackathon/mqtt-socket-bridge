const gpsTopics = ["fx", "ns", "lat", "lon", "abs", "rel"]
const batteryTopics = ["id", "vl", "pt"]
const statusTopics = ["in_air", "armed", "state", "mav_msg", "health", "fm"]



const parseTopic = (topic, message) => {
    const topics = topic.split('/')

    // define length
    // if lenth is 3 => gps or battery
    // if length is 2 => status

    // return object accordingly

    let result = {devTopic: topics[0]}

    if(topics.length === 3) {
        const key = topics[2]
        if(gpsTopics.includes(key)) {
            return {...result, gps: {[key]: message}}
        }

        if(batteryTopics.includes(key)) {
            return {...result, battery: {[key]: message}}
        }
    }

    const key = topics[1]

    if(statusTopics.includes(key)) {
        return {...result, status: {[key]: message}}
    }

    return {}

}


module.exports = {parseTopic}