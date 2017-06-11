ALTER TABLE public.requests ADD COLUMN start_month INTEGER;

ALTER TABLE public.requests ADD COLUMN end_month INTEGER;

ALTER TABLE public.requests ADD COLUMN start_year INTEGER;

ALTER TABLE public.requests ADD COLUMN end_year INTEGER;

ALTER TABLE public.requests DROP COLUMN start_date;

ALTER TABLE public.requests DROP COLUMN end_date;

ALTER TABLE public.variables ADD COLUMN active boolean;

ALTER TABLE public.variables ALTER COLUMN active TYPE character varying (1);