# Projeto INPE/CPTEC - Aplicação Servidor NodeJS e MongoDB

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
