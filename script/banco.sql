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