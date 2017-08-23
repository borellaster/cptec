var fs = require('fs');

module.exports =  {

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