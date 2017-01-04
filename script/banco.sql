CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
SET postgis.gdal_enabled_drivers = 'ENABLE_ALL';


/*Country table*/
CREATE TABLE countries
(
  id bigserial NOT NULL,
  name text NOT NULL,
  nickname character varying(5),
  geoid text,
  created_at date,
  updated_at date,
  CONSTRAINT countries_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE countries OWNER TO cptec;

/*State table*/
CREATE TABLE states
(
  id bigserial NOT NULL,
  name text NOT NULL,
  nickname character varying(5),
  geoid text,
  created_at date,
  updated_at date,
  country_id bigserial NOT NULL,
  CONSTRAINT states_pkey PRIMARY KEY (id),
  CONSTRAINT fk_state_country FOREIGN KEY (country_id) REFERENCES countries (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE states OWNER TO cptec;

/*city table*/
CREATE TABLE cities
(
  id bigserial NOT NULL,
  name text NOT NULL,
  nickname character varying(5),
  geoid text,
  created_at date,
  updated_at date,
  latitude double precision,
  longitude double precision,
  altitude double precision,
  state_id bigserial NOT NULL,
  CONSTRAINT cities_pkey PRIMARY KEY (id),
  CONSTRAINT fk_city_state FOREIGN KEY (state_id) REFERENCES states (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE cities OWNER TO cptec;


/*Variable variables*/
CREATE TABLE variables
(
  id bigserial NOT NULL,
  description text NOT NULL,
  nickname character varying(5),
  unit character varying(20),
  color_map json,
  created_at date,
  updated_at date,
  CONSTRAINT variables_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE variables OWNER TO cptec;

/*raster data*/
CREATE TABLE raster_data
(
  id bigserial NOT NULL,
  date date,
  time time,
  rast raster,
  filename text,
  variable_id bigserial NOT NULL,
  CONSTRAINT raster_data_pkey PRIMARY KEY (id),
  CONSTRAINT fk_raster_data_variable FOREIGN KEY (variable_id) REFERENCES variables (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE cities OWNER TO cptec;

/*User table*/
CREATE TABLE users
(
  id bigserial NOT NULL,
  name text NOT NULL,
  username character varying(100),
  password character varying(100),
  created_at date,
  updated_at date,
  CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users OWNER TO cptec;

/*types table*/
CREATE TABLE types
(
  id bigserial NOT NULL,
  name text NOT NULL,
  extension character varying(10),
  created_at date,
  updated_at date,
  CONSTRAINT types_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE types OWNER TO cptec;