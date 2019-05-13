const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = 3001
let user = undefined

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/registration', (req, res) => { 
    if(!req.body.email || !req.body.pass) return res.sendStatus(400)   
    console.log(req.body) 
    user = req.body 
    res.redirect('/registration') 
    
})
app.get('/registration', (req, res) => { 
    if(typeof user !== 'object') return res.sendFile(__dirname + '/registration.html')   
    res.send(`Регистрация прошла успешно! Данные учетной записи отправлены на email: ${user.email}`) 
    user = undefined  
})

app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/registration`))