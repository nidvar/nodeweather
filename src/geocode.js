const request = require('postman-request');

const get_coordinates = (location,callback)=>{
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibmlkdmFyIiwiYSI6ImNrOWgxcW1kNjB0emQzZG52ZWhzOGdjaWsifQ.LKQrn_2T8AowFhYn22awpQ&limit=1`, (error, response)=> {
      if(error){
        console.log('something failed')
      }else{
        const x = JSON.parse(response.body)
        const {features} = x
        console.log(x)
        if(features[0] ==undefined){
          const longitude = 0
          const latitude = 0
          callback(longitude, latitude)
          return
        }
        
        const longitude = features[0].center[0]
        const latitude = features[0].center[1]
        callback(longitude, latitude)
      }
    });
}



module.exports={
    get_coordinates:get_coordinates
}