var http = require('http');
var endPoint = "http://localhost:8181/workers";
var nodemailer = require('nodemailer');
//var realNames = require('./lib/realnames');
var lang = require('./lib/lang');
var config = require('./config');

process.env.NODE_ENV = process.env.NODE_ENV || "development";
var envConf = config[process.env.NODE_ENV];

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: envConf.gmail.user,
    pass: envConf.gmail.password
  }
});

var mailOptions = {
  from: envConf.mailOpts.from,
  to: envConf.mailOpts.to,
  subject: envConf.mailOpts.subject,
  text: ''
};

var sendMail = function (mailOptions) {
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.error(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
};

var parseBody = function (body) {

  var mailText = '';

  var data = JSON.parse(body);

  var addToMailText = function(element, index, array) {
    if (index === 0) {
      mailText += '\n' + lang[element.status.statusType].en + '\n';
      mailText += '--------------------------------\n';
    }
    mailText += element.name + '\n';
  };

  var workingInOffice = data.filter(function (obj) {
    return obj.status.statusType === "InOffice";
  });

  var workingOutOfOffice = data.filter(function (obj) {
    return obj.status.statusType === "OutOfOffice";
  });

  var holiday = data.filter(function (obj) {
    return obj.status.statusType === "Holiday";
  });

  var sick = data.filter(function (obj) {
    return obj.status.statusType === "Sick";
  });

  workingOutOfOffice.forEach(addToMailText);
  holiday.forEach(addToMailText);
  sick.forEach(addToMailText);
  workingInOffice.forEach(addToMailText);
  mailOptions.text = mailText;
  sendMail(mailOptions);

};


http.get(endPoint, function(res) {

  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    parseBody(body);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
