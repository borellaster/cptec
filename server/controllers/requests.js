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
var jsonfile = require('jsonfile');
var js2xmlparser = require("js2xmlparser");
var JSZip = require("jszip");;
var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['value', 'date', 'time', 'variable'];
var fieldNames = ['Valor', 'Data', 'Hora', 'Variavel'];
var file = "";
var output = "";

/*send mail*/
var http = require('http');
var nodemailer = require('nodemailer');
var base64 = require('file-base64');

/*report*/
//var Report = require('fluentReports').Report;

module.exports = {

  findAll(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    request.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     include: {all: true}
                     }).then(function (requests) {
                      
      result.data = requests;
      db.sequelize.query("select count(id) from \"requests\" " , { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = parseInt(count[0].count);
        result.page = parseInt(req.params.page);
        result.pages = parseInt(Math.ceil(result.count / req.params.size));  
        res.status(200).json(result);
      });      
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  search(req, res) {
    var result = {data: [], count: 0, page: 1, pages: 1};
    var name="%", where="";
    if(req.params.page <= 0) {
      req.params.page = 1;
    }
    if(req.params.name != undefined){
      name = req.params.name;
      where = " where name ilike '%"+name+"%' "; 
    }
    request.findAll({offset: req.params.size * (req.params.page-1), 
                     limit: req.params.size, 
                     order: 'name',
                     where: {name: {$iLike: '%'+name+'%'}},
                     include: {all: true}
                     }).then(function (requests) {
                      
      result.data = requests;
      db.sequelize.query("select count(id) from \"requests\"  "+where , { 
                type:db.Sequelize.QueryTypes.SELECT}).then(function(count) {
        result.count = parseInt(count[0].count);
        result.page = parseInt(req.params.page);
        result.pages = parseInt(Math.ceil(result.count / req.params.size));  
        res.status(200).json(result);
      });      
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },  

  findById(req, res) {
    request.findById(req.params.id, {include: {all: true}}).then(function (request) {
      res.status(200).json(request);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  findByHashDownload(req, res) {
    var result = {data: []};
    request.findOne({ where: {hash: req.params.hash}, include: {all: true}}).then(function (request) {
      result.data = request;
      res.status(200).json(result);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },  

  save(req, res) {    
    request.create(req.body).then(function (object) {
        res.status(200).json(object);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {    
    request.update(req.body,{where: {id: req.params.id}}).then(function (updatedRecords) {
      res.status(200).json(req.body);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    request.destroy({where: {id: req.params.id}}).then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  process(req, res) {    
    request.findById(req.params.id, {include: {all: true}}).then(function (requisicao) {
        var rootPath = path.resolve(__dirname);
        rootPath = rootPath.substring(0, rootPath.length -24);        
        var adjusted = functions.findQuadrant(requisicao.location.coordinates[0], requisicao.location.coordinates[1]);
        var latitude = adjusted.lat;
        var longitude = adjusted.lng; 

        var where = " where 1=1 ";
        where += " and extract(month from date) between "+requisicao.start_month+" and "+requisicao.end_month;
        where += " and extract(year from date) between "+requisicao.start_year+" and "+requisicao.end_year;
        where += " and variable in ("+ requisicao.variables + ")";
        where += " and upper(model) = upper('"+requisicao.model.model+"') ";
        where += " and upper(model_resolution) = upper('"+requisicao.model.resolution+"') ";
        where += " and upper(model_coupled) = upper('"+requisicao.model.couple+"') ";
        where += " and upper(scenario) = upper('"+requisicao.model.scenario+"') ";

        //discover table by model and frequence.
        /*var sqlModelFreq = "select name from \"models_freq\" ";
        sqlModelFreq += "   where model_id = "+requisicao.model_id;
        sqlModelFreq += "   and interval_id = "+requisicao.interval_id;
        db.sequelize.query(sqlModelFreq , { 
                  type:db.Sequelize.QueryTypes.SELECT}).then(function(name) {
          console.log(name);
        });*/

        modelfreq.findAll({limit: 1,
                         where: {model_id: requisicao.model_id, interval_id: requisicao.interval_id},
                         }).then(function (modelfreqs) {
          console.log(modelfreqs[0].name);
          var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
          " to_char(date, 'YYYY-MM-DD') as date, time, variable "+
          " from "+ modelfreqs[0].name + " "+
          where + 
          " order by variable, date, time ";
          db.sequelize.query(query, {type:db.Sequelize.QueryTypes.SELECT}).then(function(rasters) {
              if(requisicao.type.extension == '.csv'){
                  output = json2csv({ data: rasters, fields: fields, fieldNames: fieldNames, del: ';'});
              } else if(requisicao.type.extension == '.json'){
                  output = JSON.stringify(rasters);
              } else if(requisicao.type.extension == '.xml'){
                  output = js2xmlparser.parse("data", rasters);
              }

              /*report*/
              //var data = [{name: 'Elijah', age: 18}, {name: 'Abraham', age: 22}, {name: 'Gavin', age: 28}];
              // Create a Report  
              //var rpt = new Report(rootPath+'Requisicao_'+requisicao.id+'.pdf')        
              //      .pageHeader(["Employee Ages"])
              //      .data(data)
              //      .detail([['name', 200],['age', 50]])
              //      .render();


              var zip = new JSZip();
              zip.file('Requisicao_'+requisicao.id+requisicao.type.extension, output);
              zip
              .generateNodeStream({type:'nodebuffer',streamFiles:true})
              .pipe(fs.createWriteStream(rootPath+'Requisicao_'+requisicao.id+'.zip'))
              .on('finish', function () {
                  console.log(rootPath+'Requisicao_'+requisicao.id+'.zip written.');
                  base64.encode(rootPath+'Requisicao_'+requisicao.id+'.zip', function(err, base64String) {  
                    var query = "UPDATE requests SET file = '"+base64String+"' WHERE id = "+requisicao.id;
                    db.sequelize.query(query, {type:db.Sequelize.QueryTypes.BULKUPDATE}).then(function(reqUpdate) {
                      configuration.findById(1).then(function (configuration) {
                        //res.writeHead(200, {'Content-Type': 'text/plain'});
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
                            subject: 'Requisição CPTEC',
                            text: '',
                            html: conteudo
                        }, function(error, response){
                            if(error){
                                console.log('Falha ao enviar email');
                                console.dir({success: false, existing: false, sendError: true});
                                console.dir(error);
                            }else{
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
              });

              res.status(200).json(req.body);
          }).catch(function (error) { 
            res.status(500).json(error);
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
