const nodemailer = require('nodemailer')

// Пожалуйста, используйте свой собственный почтовый аккаунт для рассылки
const defaultConfig = "smtps://Ваш_email:Ваш_пароль@smtp.mail.ru"

const poolConfig = "smtps://Ваш_email:Ваш_пароль@smtp.mail.ru/?pool=true"

const transporter = nodemailer.createTransport(
    // {    
    //     pool: true,
    //     // maxConnections: 8,
    //     // socketTimeout: 1000000,
    //     // maxMessages: 'infinity',
    //     // rateLimit: 2,
    //     // rateDelta: 2000,
    //     host: 'smtp.mail.ru',
    //     port: 465,
    //     secure: true, // true for 465, false for other ports       
    //     auth: {
    //        user: '******', // (замените звездочики на название вашего почтового ящика) 
    //        pass: '******' // (замените звездочики на название вашего почтового ящика) 
    //     },
    // },
    poolConfig,
    {
        from: 'Mailer Test <******>' // (замените звездочики на название вашего почтового ящика)
    }
)

transporter.verify((error, success) => {
    error ? console.log(error) :
     console.log('Server is ready to take our messages: ', success)
})

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
        // transporter.close()
    })
}

module.exports = mailer