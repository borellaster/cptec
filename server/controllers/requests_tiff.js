request = require('../models/').request;
modelfreq = require('../models/').modelfreq;
configuration = require('../models/').configuration;
type = require('../models/').type;
point = require('../models/').point;
var db = require('../models/index');

/*process*/
var path = require('path');
var dateFormat = require('dateformat');
var functions = require(__dirname + '/../tools/functions');
var JSZip = require("jszip");
var archiver = require("archiver");
var fs = require('fs');
var file = "";
var output = "";

/*send mail*/
var http = require('http');
var nodemailer = require('nodemailer');
var base64 = require('file-base64');
var JSONB = require('json-buffer')
var Buffer = require('buffer').Buffer;
var base64Binario = require('base-64');

/*report*/
var Report = require('fluentreports').Report;
var PDFDocument, doc;
PDFDocument = require('pdfkit'); 

module.exports = {

  process(req, res) {    
    request.findById(req.params.id, {include: {all: true}}).then(function (requisicao) {
        var rootPath = path.resolve(__dirname);
        rootPath = rootPath.substring(0, rootPath.length -24);  
        doc = new PDFDocument;
        doc.pipe(fs.createWriteStream(rootPath+'Requisicao_'+requisicao.id+'.pdf'));
        doc.fontSize(18).text('Resumo da Requisição', 100, 80);

        doc.fontSize(14).text('');
        doc.fontSize(14).text('Nome: '+requisicao.name, {width: 410, align: 'left'});
        doc.fontSize(14).text('E-mail: '+requisicao.email, {width: 410, align: 'left'});
        doc.fontSize(14).text('Cenário Climático: '+requisicao.model.name, {width: 410, align: 'left'});
        doc.fontSize(14).text('Frequência: '+requisicao.interval.name, {width: 410, align: 'left'});
        if(requisicao.query_type == 'CO'){
          doc.fontSize(14).text('Tipo de Requisição: Por ponto', {width: 410, align: 'left'});
        }else if(requisicao.query_type == 'CI'){
          doc.fontSize(14).text('Tipo de Requisição: Por cidade', {width: 410, align: 'left'});
        }else{
          doc.fontSize(14).text('Tipo de Requisição: Por área retangular no mapa', {width: 410, align: 'left'});
        }
        var variablesWithouAspa = requisicao.variables.replace("'", "");
        variablesWithouAspa = variablesWithouAspa.replace("'", "");
        variablesWithouAspa = variablesWithouAspa.replace("'", "");
        variablesWithouAspa = variablesWithouAspa.replace("'", "");
        var periodo = requisicao.start_month + "-" + requisicao.start_year +"/";
        periodo += requisicao.end_month + "-" + requisicao.end_year;
        
        doc.fontSize(14).text('Variáveis: '+variablesWithouAspa, {width: 410, align: 'left'});
        doc.fontSize(14).text('Período: '+periodo, {width: 410, align: 'left'});
        doc.fontSize(14).text('Utilização do dado: '+requisicao.utilizacao, {width: 410, align: 'left'});
        doc.fontSize(14).text('Instituição: '+requisicao.instituicao, {width: 410, align: 'left'});
        doc.fontSize(14).text('Saída: '+requisicao.type.name, {width: 410, align: 'left'});
        doc.end();

        var where = " where 1=1 ";
        where += " and extract(month from date) between "+requisicao.start_month+" and "+requisicao.end_month;
        where += " and extract(year from date) between "+requisicao.start_year+" and "+requisicao.end_year;
        where += " and variable in ("+ requisicao.variables + ")";
        where += " and upper(model) = upper('"+requisicao.model.model+"') ";
        where += " and upper(model_resolution) = upper('"+requisicao.model.resolution+"') ";
        where += " and upper(model_coupled) = upper('"+requisicao.model.couple+"') ";
        where += " and upper(scenario) = upper('"+requisicao.model.scenario+"') ";

        modelfreq.findAll({limit: 1, include: {all: true}, 
                         where: {model_id: requisicao.model_id, interval_id: requisicao.interval_id},
                         }).then(function (modelfreqs) {
          console.log("new table -> "+modelfreqs[0].name);
          console.log("correct_days value -> "+modelfreqs[0].model.correct_days);
          var query = "";
          
          var poligono = "";
          var tmp = "";
          for(var i = 0; i < requisicao.location.coordinates[0].length;i++){
            tmp = requisicao.location.coordinates[0][i];
            tmp = tmp[0] + " " + tmp[1]+ ",";
            poligono += tmp;
          }
          poligono = poligono.substring(0, poligono.length -1);

          var query = "select create_tif ('"+rootPath+"Requisicao_"+requisicao.id+".tif', ";
          query+= "'POLYGON(("+poligono+"))', ";
          query+= requisicao.start_month+",";
          query+= requisicao.end_month+",";
          query+= requisicao.start_year+",";
          query+= requisicao.end_year+",";
          query+= requisicao.variables+",";
          query+= "'"+requisicao.model.model+"',";
          query+= "'"+requisicao.model.resolution+"',";
          query+= "'"+requisicao.model.couple+"',";
          query+= "'"+requisicao.model.scenario+"',";
          query+=   "'tif'";
          query+=   ");";
          db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(tif) {
              var out = fs.createWriteStream(rootPath+'Requisicao_'+requisicao.id+'.zip');
              var archive = archiver('zip', {
                  zlib: { level: 9 }
              });

              out.on('close', function() {
                base64.encode(rootPath+'Requisicao_'+requisicao.id+'.zip', function(err, base64String) {  
                  var query = "UPDATE requests SET file = '"+base64String+"' WHERE id = "+requisicao.id;
                  db.sequelize.query(query, {type:db.Sequelize.QueryTypes.BULKUPDATE}).then(function(reqUpdate) {
                    configuration.findById(1).then(function (configuration) {
                      var fromEmail = configuration.mail;
                      var toEmail = requisicao.email;
                      var conteudo = "Olá "+requisicao.name;
                      conteudo += "<br><br>Informamos que a sua requisição está disponível.";
                      conteudo += "<br>Clique no link abaixo para ser direcionado até a área de download";
                      conteudo += "<br><br>"+configuration.link+requisicao.hash + "<br>";
                      conteudo += "<br>Quando os dados forem utilizados para trabalhos acadêmicos e publicações utilizar nas referências bibliográficas a fonte dos dados CPTEC/INPE da seguinte forma “Dados gerados pelo CPTEC/INPE” e as referências bibliográficas:<br>";
                      conteudo += "<br>1. Chou, S.C, Lyra, A. , Mourão, C. , Dereczynski, C. , Pilotto, I. , Gomes, J. , Bustamante, J. , Tavares, P. , Silva, A. , Rodrigues, D. , Campos, D. , Chagas, D. , Sueiro, G. , Siqueira, G. , Nobre, P. and Marengo, J. (2014) Evaluation of the Eta Simulations Nested in Three Global Climate Models. American Journal of Climate Change, 3, 438-454. doi:10.4236/ajcc.2014.35039. http://www.scirp.org/journal/PaperInformation.aspx?PaperID=52887#.VakHg_lViko<br>";
                      conteudo += "<br>2. Chou, S.C, Lyra, A. , Mourão, C. , Dereczynski, C. , Pilotto, I. , Gomes, J. , Bustamante, J. , Tavares, P. , Silva, A. , Rodrigues, D. , Campos, D. , Chagas, D. , Sueiro, G. , Siqueira, G. and Marengo, J. (2014) Assessment of Climate Change over South America under RCP 4.5 and 8.5 Downscaling Scenarios. American Journal of Climate Change,3, 512-527. doi: 10.4236/ajcc.2014.35043. http://www.scirp.org/journal/PaperInformation.aspx?PaperID=52877#.VakIh_lVikp<br>";
                      conteudo += "<br>3. Lyra, A., Tavares, P., Chou, S.C., Sueiro, G., Dereczynski, C.P., Sondermann, M., Silva, A., Marengo, J., Giarolla, A. 2017.  Climate change projections over three metropolitan regions in Southeast Brazil using the non-hydrostatic Eta regional climate model at 5-km resolution Theor Appl Climatol. doi:10.1007/s00704-017-2067-z.  https://link.springer.com/article/10.1007/s00704-017-2067-z<br>";
                      conteudo += "<br>4. Terceira Comunicação Nacional do Brasil à Convenção-Quadro das Nações Unidas sobre Mudança do Clima<br>";
                      conteudo += "<br>Executive Summary:  http://unfccc.int/resource/docs/natc/branc3es.pdf<br>";   
                      conteudo += "<br>Volume 1: http://unfccc.int/resource/docs/natc/branc3v1.pdf<br>";
                      conteudo += "<br>Volume 2: http://unfccc.int/resource/docs/natc/branc3v2.pdf<br>";
                      conteudo += "<br>Volume 3: http://unfccc.int/resource/docs/natc/branc3v3.pdf<br>";

                      var transporter = nodemailer.createTransport({
                        host: configuration.smtp,
                        port: configuration.port,
                        secure: configuration.ssl,
                        debug: true,
                          auth: {
                            user: configuration.mail,
                            pass: configuration.password
                          },
                          tls: {
                              rejectUnauthorized: false
                          }
                      });
                      transporter.sendMail({
                          from: fromEmail,
                          to: toEmail,
                          subject: 'Requisição CPTEC',
                          text: '',
                          html: conteudo
                      }, function(error, response){
                          if(error){
                              console.log(error);
                              console.log('Falha ao enviar email');
                              console.dir({success: false, existing: false, sendError: true});
                              console.dir(error);
                          }else{
                              console.log(error);
                              console.log('Email enviado com sucesso');
                              console.dir({success: true, existing: false, sendError: false});
                              console.dir(response);
                          }
                      });
                       res.status(200);
                    }).catch(function (error){
                      res.status(500).json(error);
                    }); 
                  }).catch(function (error){
              
                  });                        
                });
                console.log(archive.pointer() + ' total bytes');
                console.log('archiver has been finalized and the out file descriptor has closed.');
              });

              archive.on('warning', function(err) {
                if (err.code === 'ENOENT') {
                } else {
                    throw err;
                }
              });

              archive.on('error', function(err) {
                throw err;
              });

              archive.pipe(out);
              //archive.append(output, { name: 'Requisicao_'+requisicao.id+".tif"});
              var fileTiff = rootPath+'Requisicao_'+requisicao.id+'.tif';
              archive.append(fs.createReadStream(fileTiff), { name: 'Requisicao_'+requisicao.id+'.tif' });
              
              var file1 = rootPath+'Requisicao_'+requisicao.id+'.pdf';
              archive.append(fs.createReadStream(file1), { name: 'Requisicao_'+requisicao.id+'.pdf' });
              archive.finalize();
          }).catch(function (error){
            
          }); 
        }).catch(function (error) {
          res.status(500).json(error);
        });
        res.status(200);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }

};
