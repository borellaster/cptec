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
###v1_01_20101001_0000.tif
* 1-version
* 2-variable (01 ao 42, se passa de 100, temos que iniciar com 001 ao 042).
* 3-date
* 4-time