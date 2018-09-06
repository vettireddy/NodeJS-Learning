var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Account = {
  gmail: {
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
      user: 'venki5890@gmail.com',
      pass: 'vijayalaxmi'
    },
    from: 'venki5890@gmail.com'

  }
}

/* GET email page. */
router.get('/:email', function (req, res, next) {
  let email = req.params.email;
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      host: Account.gmail.host,
      port: Account.gmail.port,
      secure: Account.gmail.secure,
      auth: {
        user: Account.gmail.auth.user,
        pass: Account.gmail.auth.pass
      }
    });

    let mailoptions = {
      from: Account.gmail.from,
      to: email,
      subject: 'Nodemailer',
      text: 'Hello World from Nodemailer',
      html: '<b>Hello World!</b>'
    };

    transporter.sendMail(mailoptions, (err, info) => {
      if (err) {
        return console.log(err);
      } else {
        res.send('Email Sent to '+req.params.email);
        console.log('Message Sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    });
  });

});

module.exports = router;
