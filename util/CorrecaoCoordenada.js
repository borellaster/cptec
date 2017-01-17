
function buscarQuadrante(lat, lng){
    
        var latMin = -35.05;
        var latMax = 5.90;

        var lngMin = -75.5;
        var lngMax = -33.95;

        var scala = 0.15;

        var coord = {lat: Number, lng:Number};

        for(latMin; latMin < latMax; latMin += scala){
            if(lat > latMax){
                coord.lat = latMax;
                break;
            }
            if(lat < latMin){
                coord.lat = latMin;
                break;
            }
            if(Math.abs(lat - latMin) <= 0.075){
                 coord.lat = latMin;
               break;
            }
        }
      
        for(lngMin; lngMin < lngMax; lngMin += scala){
            if(lng > lngMax){
                coord.lng = lngMax;
                break;
            }
            if(lng < lngMin){
                coord.lng = lngMin;
                break;
            }
            if(Math.abs(lngMin - lng) <= 0.075){;
                 coord.lng = lngMin;
              break;
            }
        }

        return coord;
    }
