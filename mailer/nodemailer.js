const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
  {
    pool: true,
    service: 'Gmail',  
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret:  process.env.EMAIL_CLIENT_SECRET,
    }
  },
  {
    from: `Mailer Test <${process.env.EMAIL}>`
  }
)

transporter.verify((error, success) => {
  if (error) return console.log(error)
  console.log('Server is ready to take our messages: ', success)
  transporter.on('token', token => {
    console.log('A new access token was generated')
    console.log('User: %s', token.user)
    console.log('Access Token: %s', token.accessToken)
    console.log('Expires: %s', new Date(token.expires))
  })
})

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err)
    console.log('Email sent: ', info)
  })
}

module.exports = mailer
