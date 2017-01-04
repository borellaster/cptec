create or replace function raster_data_BI()returns trigger

as

$$

declare v_date text;

v_time text;

v_variable text;

Begin

v_date=split_part(new.filename,'_',7);

v_date=substring(v_date,1,4) || '-' || substring(v_date,5,2) || '-' ||

substring(v_date,7,2); new.date= cast(v_date as date);

v_time = split_part(new.filename,'_',8);

if (v_time <> '') then

v_time=substring(v_time,1,2) || ':' || substring(v_time,3,2) || ':00';

new.time=cast(v_time as time);

end if;

new.variable=split_part(new.filename,'_',6);

return new;

end;

$$ language 'plpgsql';
