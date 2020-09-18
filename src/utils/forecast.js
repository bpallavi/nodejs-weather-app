const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+latitude+","+longitude+".json?access_token=pk.eyJ1IjoicGFsbHZpYiIsImEiOiJja2V2YWZnZWEwOG91MnJueDlsaTZrZWx6In0.Np37xw0FrlAVKkDTwBL_oQ"
    request({url, json:true},(error,{ body })=>{ //response -destructured to body

        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error)   //else if(response.body.error)
        {
            callback('Unable to find location', undefined)
        }
        else{
            console.log(body.features[0].center[0])
            //callback(undefined, body.features[0].center[0].summary + ' It is currently ' + body.cfeatures[0].temperature + ' degress out. There is a ' + body.features[0].precipProbability + '% chance of rain.')
              callback(undefined,body.features[0].place_name)
        }
    })
}

module.exports = forecast