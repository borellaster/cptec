setwd("~/UPF/INPE/Eta 15km")
library(rgdal)
library(raster)

downloadFile <- function(cData){
  # ftp-supercomputacao.cptec.inpe.br/public/etaclim/APP/Eta15km_BR/OCIS/eta_15km_OCIS_2016062800-2016070900.tar.gz
  baseURL <- 'http://ftp-supercomputacao.cptec.inpe.br/public/etaclim/APP/Eta15km_BR/'
  mURL <- paste(cData, '/eta_15km_', cData, '_', sep = '')
  sufURL <- '00.tar.gz'
  fURL <- paste(baseURL, mURL, curDate, '00-', fDate, sufURL, sep = '')
  desFile <- paste(cData, '.tar.gz')
  download.file(url = fURL, destfile = desFile, method = 'auto')
  untar(desFile)
  file.remove(desFile)
}

generateDF <- function(cData, curDate, fDate){
  # eta_15km_OCIS_2016062800-2016070900.txt
  fileName <- paste('eta_15km_', cData, '_', curDate, '00-', fDate, '00.txt', sep = '' )
  cptec = read.delim2(fileName, header=FALSE, sep=" ", skip = 9, stringsAsFactors=F)
  cptec_t = t(cptec)
  colnames(cptec_t) <- cptec_t[1,]
  cptec_t <- cptec_t[-1,]
  cptec_t <- as.data.frame(cptec_t,stringsAsFactors=FALSE)
  cptec_t$LONGITUDE <- as.numeric(as.character(cptec_t$LONGITUDE))
  cptec_t$LATITUDE <- as.numeric(as.character(cptec_t$LATITUDE))
  #file.remove(fileName)
  return(cptec_t)
}

date <- Sys.Date() # dia atual - data do sistema
curDate <- format(date, '%Y%m%d')
dateString <- format(date, '%Y/%m/%d')
fDate <- as.Date(dateString) + 11
fDate <- format(fDate, '%Y%m%d')

downloadFile('OCIS')
downloadFile('PREC')
downloadFile('TP2M')
downloadFile('UR2M')
downloadFile('V10M')

OCIS <- generateDF('OCIS', curDate, fDate)
PREC <- generateDF('PREC', curDate, fDate)
TP2M <- generateDF('TP2M', curDate, fDate)
UR2M <- generateDF('UR2M', curDate, fDate)
V10M <- generateDF('V10M', curDate, fDate)

# tirando aquela linha a mais do arquivo!!!
OCIS_raster = rasterFromXYZ(OCIS[-75351,])
PREC_raster = rasterFromXYZ(PREC[-75351,])
TP2M_raster = rasterFromXYZ(TP2M[-75351,])
UR2M_raster = rasterFromXYZ(UR2M[-75351,])
V10M_raster = rasterFromXYZ(V10M[-75351,])

plot(raster(OCIS_raster,layer=100)) # exemplo de plot

datas = seq(date, date+10, by = 'day')
datas = format(datas, '%Y%m%d')
datas = rep(datas,each=24)
ultima = date+11
ultima = format(ultima, '%Y%m%d')
datas = c(datas, ultima)

hora = paste("0",0:9,sep="")
hora = paste(c(hora,10:23),"00",sep="")


nome_arquivo = paste("Eta_15_forecast_daily_","OCIS_",datas,"_",hora,"_v1.tif",sep="")
writeRaster(OCIS_raster, nome_arquivo, bylayer=TRUE)

nome_arquivo = paste("Eta_15_forecast_daily_","PREC_",datas,"_",hora,"_v1.tif",sep="")
writeRaster(PREC_raster, nome_arquivo, bylayer=TRUE)

nome_arquivo = paste("Eta_15_forecast_daily_","TP2M_",datas,"_",hora,"_v1.tif",sep="")
writeRaster(TP2M_raster, nome_arquivo, bylayer=TRUE)

nome_arquivo = paste("Eta_15_forecast_daily_","UR2M_",datas,"_",hora,"_v1.tif",sep="")
writeRaster(UR2M_raster, nome_arquivo, bylayer=TRUE)

nome_arquivo = paste("Eta_15_forecast_daily_","V10M_",datas,"_",hora,"_v1.tif",sep="")
writeRaster(V10M_raster, nome_arquivo, bylayer=TRUE)

