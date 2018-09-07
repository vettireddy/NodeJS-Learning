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
      html: '<b>Hello World!</b>',
      attachements: [
        {
          // utf-8 string as an attachment
          filename: 'sample1.txt',
          content: 'This is the sample text file, attached to the mail'
        },
        {
          // binary buffer as an attachement
          filename: 'sample2.txt',
          content: new Buffer('hello world', 'utf-8')
        },
        {
          // file on disk as an attachement
          finename: 'sample3.txt',
          path: './email.js' // stream this file
        },
        {
          // filename and content is derived from the file
          path: './email.js'
        },
        {
          // define custom content type for the attachement
          filename: 'sample4.bin',
          content: 'Hello World',
          contentType: 'text/plain'
        },
        {
          // use URL as an attachement
          filename: 'license.txt',
          path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        },
        {
          // encoded string as an attachement
          filename: 'sample5.txt',
          content: 'aGVsbG8gd29ybGQh',
          encoding: 'base64'
        },
        {
          // data uri as an attachement
          path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        },
        {
          // use pregenerated MIME node
          raw: 'Content-Type: text/plain\r\n' +
            'Content-Disposition: attachment;\r\n' +
            '\r\n' +
            'Hello world!'
        }
      ]
    };

    transporter.sendMail(mailoptions, (err, info) => {
      if (err) {
        return console.log(err);
      } else {
        res.send('Email Sent to ' + req.params.email);
        console.log('Message Sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    });
  });

});

module.exports = router;
