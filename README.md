# Projeto CPTEC/INPE - Aplicação Servidor NodeJS e PostgreSQL/PostGIS

##Projeções das mudanças climáticas para estudos de impactos sobre a disponibilidade hídrica no país com implicações na segurança alimentar e energética.

Este projeto tem por objetivo gerar projeções de mudanças climáticas regionalizadas e avaliar os impactos sobre a disponibilidade hídrica no país, em diferentes cenários de emissão, em alta resolução espacial, com implicações na segurança alimentar e energética.. 
Situação: Em andamento; Natureza: Pesquisa.


## Requisitos

* [Git](http://git-scm.com/)

* [node.js (at least v4.5.0)](http://nodejs.org/)
 
* [PostgreSQL (at least v9.6.1)](https://www.postgresql.org/download/).

## Instalação

Abra o Git Bash e entre com os comandos
-----------
```
git clone https://github.com/borellaster/cptec.git
cd cptec
npm install
```

## Comandos

* Inicializar o servidor

`npm start` ou `node server`

## Recursos da API

### entidade

* **GET** - retorna 1 ou mais entidades

  * [.../api/entidade/]() - listagem de todas entidades, com suporte a pagiunação `?page=${num}&size=${length}`

  * [.../api/entidade/{id}]() - retorna entidade por id

* **POST** - adicionar

  * [.../api/entidade/]() - dados enviados no corpo da requisição

* **PUT** - alterar uma entidade existente

  * [.../api/entidade/{id}]() - dados enviados no corpo da requisição

* **DELETE** - remover entidade por id

  * [.../api/entidade/{id}]() 


## Padrão Raster
###ETA_MIROC5_RCP4.5_15_FORECAST_HOURLY_TP2M_20101001_0000_v1.tif
* 1-Model
* 2-Model copupled
* 3-Scenario
* 4-Model resolution
* 5-Ensemble (forecast, historical, ensemble model)
* 6-Interval (daily, monthly and hourly)
* 7-Model variable
* 8-date
* 9-time
* 10-version
