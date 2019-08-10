drop table if exists jedi;
drop table if exists house;

CREATE TABLE house
(
    id uuid NOT NULL,
    address character varying(355),
    PRIMARY KEY (id)
);

CREATE TABLE jedi
(
    id uuid NOT NULL,
    name character varying(355),
	house_id uuid REFERENCES house(id),
    PRIMARY KEY (id)
);

INSERT INTO house VALUES (
	'412704cd-e921-4210-8cf0-23c961c51d8d',
	'123 real st 90210'
);

INSERT INTO house VALUES (
	'97821964-7d1d-4f13-a3a2-13b947e8a71e',
	'200 legit rd 90211'
);

INSERT INTO jedi VALUES (
	'a0d8f125-70cf-4b0e-bc52-1db41736b1ac',
	'Luke Skywalker',
	'97821964-7d1d-4f13-a3a2-13b947e8a71e'
);

INSERT INTO jedi VALUES (
	'd45e8eaa-0c96-421b-98e8-a8694caed9e3',
	'Yoda'
);

INSERT INTO jedi VALUES (
	'03e2b780-6b32-4ccf-902f-8f51eba4c5ec',
	'Mace Windu',
	'412704cd-e921-4210-8cf0-23c961c51d8d'
);

SELECT jedi.id, jedi.name, house.address
FROM jedi
JOIN house ON jedi.house_id = house.id
