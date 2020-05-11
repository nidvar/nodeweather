const express = require('express')
const path = require('path')
const hbs = require('hbs');

const forecast = require('./forecast')
const geocode = require('./geocode')

const app = express();
const port = process.env.PORT || 3000
const testing_path = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(testing_path))

console.log('reneg')


app.get('',(req,res)=>{
    res.render('index',{
        title:'Home, HBS',
        name:'Trump of Home'
    })
})

app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:'Contact',
        name:'Trump of Contact'
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        res.send({
            error:'no search found'
        })
    }else{
        res.send({
            products:[]
        })
    }
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'you need an address'
        })
    }else{
        geocode.get_coordinates(req.query.address,(long,lat)=>{
            forecast.forecast(long,lat,(x)=>{
                if(long==0 && lat == 0){
                    res.send({
                        location: 'fail'
                    })
                    return
                }
                const {current, location} = x
                res.send({
                    location: req.query.address,
                    weather:current.weather_descriptions[0],  
                    country:location.country,
                    region:location.region,
                    name:location.name,
                })
            })
        })
    }
})

app.get('/contact/*',(req,res)=>{
    res.render('error',{
        title:'CONTACT 404',
        name:'contact error',
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        title:'ERROR 404',
        name:'Trump of Error'
    })
})

app.listen(port,()=>{
    console.log('server is up and running')
})