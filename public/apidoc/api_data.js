define({ "api": [  {    "type": "delete",    "url": "/countries/:id",    "title": "Remove a country",    "group": "Countries",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>Country id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Delete error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/countries.js",    "groupTitle": "Countries",    "name": "DeleteCountriesId"  },  {    "type": "get",    "url": "/countries",    "title": "Find all",    "group": "Countries",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "Country",            "description": "<p>list</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.id",            "description": "<p>id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "country.name",            "description": "<p>name</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "country.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.latitude",            "description": "<p>latitude</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "country.updated_at",            "description": "<p>Last update</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "country.created_at",            "description": "<p>Register date</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}]",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "List error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/countries.js",    "groupTitle": "Countries",    "name": "GetCountries"  },  {    "type": "get",    "url": "/countries/:id",    "title": "Find a country",    "group": "Countries",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>Country id</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.id",            "description": "<p>id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "country.name",            "description": "<p>name</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "country.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.latitude",            "description": "<p>latitude</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "country.updated_at",            "description": "<p>Last update</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "country.created_at",            "description": "<p>Register date</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Country not found",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Find error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/countries.js",    "groupTitle": "Countries",    "name": "GetCountriesId"  },  {    "type": "post",    "url": "/countries",    "title": "Register a new country",    "group": "Countries",    "parameter": {      "examples": [        {          "title": "Input",          "content": "{\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.id",            "description": "<p>id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "country.name",            "description": "<p>name</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "country.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "country.latitude",            "description": "<p>latitude</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "country.updated_at",            "description": "<p>Last update</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "country.created_at",            "description": "<p>Register date</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Register error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/countries.js",    "groupTitle": "Countries",    "name": "PostCountries"  },  {    "type": "put",    "url": "/countries/:id",    "title": "Update a country",    "group": "Countries",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "country.id",            "description": "<p>id</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "country.name",            "description": "<p>name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "country.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "country.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "country.latitude",            "description": "<p>latitude</p>"          }        ]      },      "examples": [        {          "title": "Input",          "content": "{\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Update error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/countries.js",    "groupTitle": "Countries",    "name": "PutCountriesId"  },  {    "type": "delete",    "url": "/states/:id",    "title": "Remove a state",    "group": "States",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>State id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Delete error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/states.js",    "groupTitle": "States",    "name": "DeleteStatesId"  },  {    "type": "get",    "url": "/states",    "title": "Find all",    "group": "States",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "State",            "description": "<p>list</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.id",            "description": "<p>id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "state.name",            "description": "<p>name</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "state.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.latitude",            "description": "<p>latitude</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "state.updated_at",            "description": "<p>Last update</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "state.created_at",            "description": "<p>Register date</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}]",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "List error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/states.js",    "groupTitle": "States",    "name": "GetStates"  },  {    "type": "get",    "url": "/states/:id",    "title": "Find a state",    "group": "States",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>State id</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.id",            "description": "<p>id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "state.name",            "description": "<p>name</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "state.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.latitude",            "description": "<p>latitude</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "state.updated_at",            "description": "<p>Last update</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "state.created_at",            "description": "<p>Register date</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "State not found",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Find error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/states.js",    "groupTitle": "States",    "name": "GetStatesId"  },  {    "type": "post",    "url": "/states",    "title": "Register a new state",    "group": "States",    "parameter": {      "examples": [        {          "title": "Input",          "content": "{\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.id",            "description": "<p>id</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "state.name",            "description": "<p>name</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "state.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "state.latitude",            "description": "<p>latitude</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "state.updated_at",            "description": "<p>Last update</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "state.created_at",            "description": "<p>Register date</p>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Register error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/states.js",    "groupTitle": "States",    "name": "PostStates"  },  {    "type": "put",    "url": "/states/:id",    "title": "Update a state",    "group": "States",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "state.id",            "description": "<p>id</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "state.name",            "description": "<p>name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "state.nickname",            "description": "<p>nickname</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "state.longitude",            "description": "<p>longitude</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "state.latitude",            "description": "<p>latitude</p>"          }        ]      },      "examples": [        {          "title": "Input",          "content": "{\n  \"name\": \"Brasil\",\n  \"nickname\": \"BR\",\n  \"longitude\": -50,\n  \"latitude\": -60\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Update error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/controllers/states.js",    "groupTitle": "States",    "name": "PutStatesId"  },  {    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "varname1",            "description": "<p>No type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "varname2",            "description": "<p>With type.</p>"          }        ]      }    },    "type": "",    "url": "",    "version": "0.0.0",    "filename": "./doc/main.js",    "group": "_Users_borella_Documents_Mestrado_Projeto_cptec_doc_main_js",    "groupTitle": "_Users_borella_Documents_Mestrado_Projeto_cptec_doc_main_js",    "name": ""  }] });
