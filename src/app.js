const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')

const app = express()


//console.log(__dirname)
const publicdirectorypath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../template/views')
const pathpartial = path.join(__dirname,'../template/partials')

//if we want to load static page in our app
app.use(express.static(publicdirectorypath))
//set method for settings in app using key:value pair for e.g key is views whose customised path is value
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(pathpartial)

//get is route method by adding this to your url where you wanna go yoou can use send method in res to send json and html
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Himanshu'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Himanshu'
    })
})

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name :'Himanshu'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
          error : 'You must provide address'
        })
    }
    const url = 'https://openweathermap.org/data/2.5/weather?q='+req.query.address+'&appid=439d4b804bc8187953eb36d2a8c26a02'
    request({url : url,json : true},(error,Response) => {
        if(error){
            res.send({
                error : 'unable to connect to web services'
            })
        }else{
            if(Response.body.cod===500){
                res.send({
                    error : 'Unable to find location'
                })
            }
            else{
                res.send({
                    description : Response.body.weather[0].description,
                    temp : Response.body.main.temp
                })
            }
        }
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 'Error',
        name: 'Himanshu',
        errormessage: '404 page not found!'
    })
})
//app.com
//app.com/help
//app.com/about
//app.com/weather

app.listen(3000, () => {
    console.log('server is up at port number 3000')
})