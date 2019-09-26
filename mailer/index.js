require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')

const app = express()

const port = process.env.PORT || 9000
let user = undefined

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/registration', (req, res) => {
  if (!req.body.email || !req.body.pass) return res.sendStatus(400)
  const message = {
    to: req.body.email,
    subject: 'Congratulations! You are successfully registred on our site',
    html: `
        <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>
        
        <i>данные вашей учетной записи:</i>
        <ul>
            <li>login: ${req.body.email}</li>
            <li>password: ${req.body.pass}</li>
        </ul>
        ${
          req.body.promo
            ? `Вы подписаны на рассылку наших акций и предложений,
        чтобы отписаться от рассылки перейдите по ссылке
        <a href="${process.env.HOST}/unsubscribe/${req.body.email}/">отписаться от рассылки</a>`
            : ''
        }
        <p>Данное письмо не требует ответа.<p>`
  }
  mailer(message)
  user = req.body
  res.redirect('/registration')
})
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.get('/registration', (req, res) => {
  if (typeof user !== 'object')
    return res.sendFile(__dirname + '/registration.html')
  res.send(
    `Регистрация прошла успешно! Данные учетной записи отправлены на email: ${user.email}`
  )
  user = undefined
})
app.get('/unsubscribe/:email', (req, res) => {
  console.log(`${req.params.email} unsubscribed`)
  res.send(`Ваш email: ${req.params.email} удален из списка рассылки!`)
})

app.listen(port, () =>
  console.log(`server listening at http://localhost:${port}`)
)
