const request = require("request")

const forecast = (long, lat, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=49fe36e9b84e5637eb2047c8b0366124&query=" + lat + "," + long 
    
    request({url, json:true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to the API", undefined)
        }else if(body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, "It is currently " + body.current.temperature + " Celsius in " + body.location.name + ".")
        }
    }
    )
    
}

module.exports = forecast