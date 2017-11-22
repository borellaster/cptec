var fs = require('fs');

var isBissexto = function(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

function customSort(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
};

module.exports =  {

  isBissexto: isBissexto,
  customSort: customSort,

  ajustaDatas: function (data) {
    var dataReturn = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var year = item.date.substring(0,4);
        if(item.date.includes("03-31")){
            item.date = item.date.replace("03-31", "02-30");
            item.date = item.date.replace("/", "-");
            item.date = item.date.replace("/", "-");
            item.date = item.date.replace("/", "-");
        } else {
            if(!isBissexto(year)){
                item.date = item.date.replace("01-31", "02/29");
                item.date = item.date.replace("/", "-");
                item.date = item.date.replace("/", "-");
                item.date = item.date.replace("/", "-");
            }
        }
        dataReturn.push(item);
    }

    return dataReturn.sort(customSort);
  },

  findQuadrant: function (lat, lng) {
    var latMin = -35.05;
    var latMax = 5.90;

    var lngMin = -75.05;
    var lngMax = -33.95;

    var scala = 0.15;

    var coord = {lat: Number, lng:Number};
    
    if(lat > latMax){
        coord.lat = latMax;
    }else if(lat < latMin){
        coord.lat = latMin;
    }else{
        coord.lat = latMin + ((Math.floor((Math.abs(latMin) + parseFloat(lat)) / scala) ) * scala ) + scala / 2;
    }

    if(lng > lngMax){
        coord.lng = lngMax;
    }else if(lng < lngMin){
        coord.lng = lngMin;
    }else{
        coord.lng = lngMin + ((Math.floor((Math.abs(lngMin) + parseFloat(lng)) / scala)) * scala ) + scala / 2;
    }

    return coord;
  },

  findQuadrantFive: function (lat, lng) {
    var latMin = -35.05;
    var latMax = 5.90;

    var lngMin = -75.05;
    var lngMax = -33.95;

    var scala = 0.05;

    var coord = {lat: Number, lng:Number};
    
    if(lat > latMax){
        coord.lat = latMax;
    }else if(lat < latMin){
        coord.lat = latMin;
    }else{
        coord.lat = latMin + ((Math.floor((Math.abs(latMin) + parseFloat(lat)) / scala) ) * scala ) + scala / 2;
    }

    if(lng > lngMax){
        coord.lng = lngMax;
    }else if(lng < lngMin){
        coord.lng = lngMin;
    }else{
        coord.lng = lngMin + ((Math.floor((Math.abs(lngMin) + parseFloat(lng)) / scala)) * scala ) + scala / 2;
    }

    return coord;
  },

  findQuadrantTwenty: function (lat, lng) {
    var latMin = -35.05;
    var latMax = 5.90;

    var lngMin = -75.05;
    var lngMax = -33.95;

    var scala = 0.20;

    var coord = {lat: Number, lng:Number};
    
    if(lat > latMax){
        coord.lat = latMax;
    }else if(lat < latMin){
        coord.lat = latMin;
    }else{
        coord.lat = latMin + ((Math.floor((Math.abs(latMin) + parseFloat(lat)) / scala) ) * scala ) + scala / 2;
    }

    if(lng > lngMax){
        coord.lng = lngMax;
    }else if(lng < lngMin){
        coord.lng = lngMin;
    }else{
        coord.lng = lngMin + ((Math.floor((Math.abs(lngMin) + parseFloat(lng)) / scala)) * scala ) + scala / 2;
    }

    return coord;
  },

  generateHtml: function (req) {
    var html = "<!DOCTYPE html> "+
               " <html> "+
               " <title>Requisição</title> "+
               " <meta charset=\"UTF-8\"> "+
               " <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> "+
               " <link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\"> "+
               " <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'> "+
               " <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> "+
               " <style> "+
               " html,body,h1,h2,h3,h4,h5,h6 {font-family: \"Roboto\", sans-serif} "+
               " </style> "+
               " <body class=\"w3-light-grey\"> "+
               "<div class=\"w3-content w3-margin-top\" style=\"max-width:1400px;\"> "+
               "   <div class=\"w3-row-padding\"> "+
               "       <div class=\"w3-container w3-card w3-white w3-margin-bottom\"> "+
               "         <h4 class=\"w3-text-grey w3-padding-16\">PROJETA CPTEC/INPE - Resumo da requisição</h4> "+
               "         <h6>Cenário Climático: </h6> "+
               "         <h6>Frequência: </h6> "+
               "         <h6>Coordenadas: </h6> "+
               "         <h6>Variáveis: </h6> "+
               "         <h6>Período: </h6> "+
               "         <h6>Utilização do dado: </h6> "+
               "         <h6>Instituição: </h6> "+
               "         <h4 class=\"w3-text-grey w3-padding-16\">Dados Pessoais</h4> "+
               "         <h6>Nome: </h6> "+
               "         <h6>E-mail: </h6>  "+      
               "         <h4 class=\"w3-text-grey w3-padding-16\">Saída</h4> "+
               "         <h6>Arquivo: </h6> "+
               "       </div> "+
               "   </div> "+
               " </div> "+
               " </body> "+
               " </html>";
    return html;
  },

};