mail = require('../models/').mail;
configuration = require('../models/').configuration;

var nodemailer = require('nodemailer');

module.exports = {

  send(req, res) {
    configuration.findById(1).then(function (configuration) {
      var fromEmail = configuration.mail;
      var toEmail = configuration.contact;
      var conteudo = "Nome: "+req.body.name;
      conteudo += "<br>E-mail: "+req.body.email;
      conteudo += "<br>Mensagem: "+req.body.message;
    
      var transporter = nodemailer.createTransport({
        host: configuration.smtp,
        port: configuration.port,
        secure: configuration.ssl,
        debug: true,
          auth: {
            user: configuration.mail,
            pass: configuration.password
          }
      });
      transporter.sendMail({
          from: fromEmail,
          to: toEmail,
          subject: 'Contato PROJETA',
          text: '',
          html: conteudo
      }, function(error, response){
          if(error){
              console.log('Falha ao enviar email');
              res.status(500).json('Falha ao enviar email');
          }else{
              console.log('Email enviado com sucesso');
              res.status(200).json('Email enviado com sucesso');
          }
      });
    res.status(200);
    }).catch(function (error){
      res.status(500).json(error);
    }); 
  }

};
