var fs = require('fs');

module.exports =  {
/*Ano bissexto carrega o dia 29 normalmente. 
Dia 29 de ano que não é bissexto vira 31 de Janeiro. 
Dia 30 de Fevereiro sempre vai ser 31 de Março*/

  ajustaDatas: function (data) {
    var dataReturn = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i]; 
        if(item.date.includes("03-31")){
            item.date = item.date.replace("03-31", "02-30") + " changed..";    
        }
        dataReturn.push(item)
    }
    //console.log(dataReturn);

    return dataReturn;
  },

  isBissexto: function(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
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

  generateReport: function (path, req) {
    var contactInfo = function(rpt, data) {
        rpt.print([
        data.name,
        data.add1,
        data.add2,
        [data.city, data.state.abbr, data.zip].join(' ')
      ], {x:80});
    };

    var resultReport = new Report(path+'Requisicao_'+req.id+'.pdf')        
          .pageHeader(["Requisição"])
          .data(output)
          .detail([['name', 200],['age', 50]])
          .render();


    return coord;
  },

};