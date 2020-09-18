const  request = require('request')

const geocode = (address,callback)=>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicGFsbHZpYiIsImEiOiJja2V2YWZnZWEwOG91MnJueDlsaTZrZWx6In0.Np37xw0FrlAVKkDTwBL_oQ"
    request({ url,json: true}, (error,{ body }) =>{ // request({ url: url,json: true}, (error,response)- destructured
        if(error)
        {
            callback('unable to connect',undefined)
        }
        else if(body.features.length ==0)
        {
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            
            })
        }
    })
}

//destructuring


module.exports = geocode