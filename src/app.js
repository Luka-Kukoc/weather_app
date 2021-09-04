const express = require("express")
const path = require("path")
const hbs = require("hbs")
const request = require("request") 
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

/* console.log(__dirname)
console.log(path.join(__dirname, "../public")) */

const app = express()


// define path for express config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDir))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Luka"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Luka"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        help: "technical, communication, etc.",
        title: "Help",
        name: "Luka"
    })
})


app.get("/weather", (req, res) => {
    
    if (!req.query.adress){
        return res.send({
            error: "You must provide the adress."
        })
    }
    
    geocode(req.query.adress, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({ error }) //return makes funct stop
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }    
        
            res.send({
                location: place,
                forecast: forecastData
            })
           
        })
    })
    
})

app.get("/products", (req, res) => {

    if (!req.query.search) {
        return res.send({ //return for stoping the funct execution
            error: "You must provide search"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help article not found!",
        name: "Luka"
    })
})


app.get("*",(req, res) => {
    res.render("404", {
        title: "Page not found",
        name: "Luka"
    })
})

const port = 3000

app.listen(port, () => {
    console.log("Server is up on port 3000")
})