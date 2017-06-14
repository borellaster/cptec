request = require('../models/').request;
configuration = require('../models/').configuration;
type = require('../models/').type;
point = require('../models/').point;
var db = require('../models/index');

/*PROCESSAMENTO*/
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

/*ENVIAR EMAIL*/
var http = require('http');
var nodemailer = require('nodemailer');
var base64 = require('file-base64');

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

        var query = " select ST_VALUE(RAST, ST_SETSRID(ST_MAKEPOINT("+longitude+", "+latitude+"), 4236)) as value, "+
        " to_char(date, 'YYYY-MM-DD') as date, time, variable "+
        " from RASTER_DATA "+
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
                  
                  }).catch(function (error){
              
                  });                        
                });
            });

            res.status(200).json(req.body);
        }).catch(function (error) { 
          res.status(500).json(error);
        }); 


        configuration.findById(1).then(function (configuration) {
          //res.writeHead(200, {'Content-Type': 'text/plain'});
          var fromEmail = configuration.mail;
          var toEmail = requisicao.email;
          var conteudo = "Olá "+requisicao.name;
          conteudo += "<br><br>Informamos que a sua requisição está disponível.";
          conteudo += "<br>Clique no link abaixo para ser direcionado até a área de download";
          conteudo += "<br><br>"+configuration.link+requisicao.hash;

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

        res.status(200);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }

};
