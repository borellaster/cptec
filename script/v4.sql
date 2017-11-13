INSERT INTO TYPES(NAME, EXTENSION) VALUES ('BINÁRIO (Base64)', '.BIN');

ALTER TABLE public.models ADD COLUMN correct_days CHARACTER VARYING(1);

update public.models set correct_days = 'N';