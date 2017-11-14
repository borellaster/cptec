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