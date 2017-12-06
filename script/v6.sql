INSERT INTO TYPES(NAME, EXTENSION) VALUES ('GEOTIFF', '.tif');


create or replace function create_tif(
	p_path text, 
	p_polygon text, 
	p_start_month integer,
	p_end_month integer,
	p_start_year integer,
	p_end_year integer,
	p_variables text,
	p_model text,
	p_resolution text,
	p_coupled text,
	p_scenario text,
	p_out text)
 as
 $$
 declare v_oid bigint;
         v_bytes bigint;
 begin

SELECT oid, lowrite(lo_open(oid, 131072), tiff) As num_bytes
FROM
( VALUES (lo_create(0),
ST_Astiff((SELECT(ST_Union(ST_Clip(rast, ST_Transform((SELECT ST_GeomFromText(p_polygon,4326) As wgs_geom), ST_SRID(rast) ) ) ) ) AS rast
from raster_data
WHERE  ST_Intersects(rast, (SELECT ST_GeomFromText(p_polygon,4236) As wgs_geom))  
and extract(month from date) between p_start_month and p_end_month 
and extract(year from date) between p_start_year and p_end_year 
and variable in (p_variables) 
and upper(model) = upper(p_model)  
and upper(model_resolution) = upper(p_resolution)  
and upper(model_coupled) = upper(p_coupled)  
and upper(scenario) = upper(p_scenario)
group by variable))
) ) As v(oid,tiff) into v_oid,v_bytes;

 perform lo_export (v_oid, p_path || cast(v_oid as text) || '.tif');
 
 perform lo_unlink(v_oid);
 
 p_out='OK';
 
 end;
 $$
 language 'plpgsql';


select create_tif ('/Users/borella/Documents/duvido.tif', 
                   'POLYGON((-57.12890625 -31.653381399663985,-57.12890625 -28.92163128242129,-53.26171875 -28.92163128242129,-53.26171875 -31.653381399663985,-57.12890625 -31.653381399663985))', 
                   1,
                   12,
                   2005,
                   2005,
                   'TP2M',
                   'ETA',
                   '20',
                   'MIROC5',
                   'HISTORICAL',
                   'duvido'
                  );





