ALTER TABLE public.models ADD COLUMN start_year integer;

ALTER TABLE public.models ADD COLUMN end_year integer;

ALTER TABLE public.intervals ADD COLUMN sequence integer;

ALTER TABLE public.intervals ADD COLUMN variables integer;

ALTER TABLE public.configurations ADD COLUMN contact character varying(100);