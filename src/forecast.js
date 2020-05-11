const request = require('postman-request');

const forecast = (longitude,latitude,callback)=>{
    request(`http://api.weatherstack.com/current?access_key=499ed65bda5f1afc1a0d5a16a5a89e07&query=${latitude},${longitude}`, (error, response)=>{
        if(error){
            console.log('failed')
        }else{
            const x = JSON.parse(response.body)
            callback(x)
        }
    })
}

module.exports={
    forecast:forecast
}