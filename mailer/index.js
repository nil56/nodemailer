const express = require('express')

const app = express()

const PORT = 3001

app.get('/registration', (req, res) => {
    res.sendFile(__dirname + '/registration.html')
})

app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/registration`))