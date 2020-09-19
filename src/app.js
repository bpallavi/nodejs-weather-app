
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const port =process.env.PORT || 3000
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log(publicDirectoryPath)

//setup handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    //res.send('Hello express!')
    res.render('index',{
        title:'Weather',
        name:'Pallavi'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'My help Page',
        name:'Pallavi'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:' Created by Pallavi'
    })
})


app.get('/weather',(req,res) => {

    if(!req.query.address)
    {
        return res.send({
            error:'Please provide address'
        })
    }
//destructurig by giving default obj if no data provided
    geocode (req.query.address,(error,{latitude, longitude, location} = {} )=>{ //data destructured to lati,log,loc
        if(error)
            return res.send({
                error
            })
        
        forecast(latitude,longitude, (error, foreCastData) => {
         if(error)
            return res.send({ error })
    

        res.send({
            forecast:foreCastData,
            location,
            address:req.query.address
        })
           
        })
    })

    /*res.send({
        forecast:'Rainy',
        location:'Boston',
        address: req.query.address
    })*/
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage:'404 for help'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMessage:'404 Error!!'
    })
})
app.listen(port,() => {
    console.log('Started server')
})