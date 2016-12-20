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
ALTER TABLE countries OWNER TO postgres;

/*State table*/
