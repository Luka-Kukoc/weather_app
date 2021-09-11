const request = require("request")

const geocode = (cityname, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + cityname + ".json?access_token=pk.eyJ1IjoibHVrYWt1a29jIiwiYSI6ImNrc3VnOHlycjAyMDgybnB0bXhhNHVzZ3AifQ._k0HUWhtN2AxjquwVaDJ5w"

    request({ url, json: true }, (error, {body}) => {
        
        if(error) {
            callback("Unable to connect to location services!", undefined)
        } else if (!body.features.lenght) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode