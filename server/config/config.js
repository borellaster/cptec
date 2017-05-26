module.exports = {
	development: {
  	url: 'postgres://cptec:Cptec10@localhost:5432/cptec',
  	dialect: 'postgres',
    logging: false
  },
	production: {
  	url: process.env.DATABASE_URL,
  	dialect: 'postgres'
  },
	staging: {
  	url: process.env.DATABASE_URL,
  	dialect: 'postgres'
  },
	test: {
  	url: process.env.DATABASE_URL,
  	dialect: 'postgres'
  }
};
