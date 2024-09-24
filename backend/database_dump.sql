--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--


CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

DROP TABLE IF EXISTS public."Items" CASCADE;
DROP TABLE IF EXISTS public."Categories" CASCADE;
DROP TABLE IF EXISTS public."Renters" CASCADE;

--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Categories" (
    "ID" integer NOT NULL,
    "Name" text
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Items" (
    "Item_id" integer NOT NULL,
    "Item_name" text,
    "Category_id" integer NOT NULL,
    "Renter_id" integer,
    "Description" text,
    "Price_per_day" integer,
    "Image_url" text,
    "Availability" text,
    "Renter_name" text
);


ALTER TABLE public."Items" OWNER TO postgres;

--
-- Name: Items_Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Items_Category_id_seq" OWNER TO postgres;

--
-- Name: Items_Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_Category_id_seq" OWNED BY public."Items"."Category_id";


--
-- Name: Items_Item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_Item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Items_Item_id_seq" OWNER TO postgres;

--
-- Name: Items_Item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_Item_id_seq" OWNED BY public."Items"."Item_id";


--
-- Name: Renters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public."Renters" (
    "Renter_id" integer NOT NULL,
    "First_name" text NOT NULL,
    "Last_name" text,
    "Rating" integer,
    "Address" text,
    "Profile_pic" text,
    location public.geography(Point,4326)
);


ALTER TABLE public."Renters" OWNER TO postgres;

--
-- Name: Renters_Renter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Renters_Renter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Renters_Renter_id_seq" OWNER TO postgres;

--
-- Name: Renters_Renter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Renters_Renter_id_seq" OWNED BY public."Renters"."Renter_id";


--
-- Name: Items Item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "Item_id" SET DEFAULT nextval('public."Items_Item_id_seq"'::regclass);


--
-- Name: Items Category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "Category_id" SET DEFAULT nextval('public."Items_Category_id_seq"'::regclass);


--
-- Name: Renters Renter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renters" ALTER COLUMN "Renter_id" SET DEFAULT nextval('public."Renters_Renter_id_seq"'::regclass);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" ("ID", "Name") FROM stdin;
7	Health & Fitness
8	Outdoor
6	Baby & Kids
5	Entertainment
4	Furniture
3	Tools & Equipment
2	Clothes
1	Electronics
\.


--
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Items" ("Item_id", "Item_name", "Category_id", "Renter_id", "Description", "Price_per_day", "Image_url", "Availability", "Renter_name") FROM stdin;
1	Drone	1	1	Great Drone	35	\N	Available	Bob
2	Chanel Jumper	2	2	Vintage	45	\N	Available	Betty
3	Jack Hammer	3	3	One hell of a good Jack Hammer	30	\N	Available	Adrian
4	Couch	4	4	Limited edition	80	\N	Available	Patrick
5	Nintendo Switch	5	5	Has Animal Crossing	40	\N	Available	Christina
6	Baby Cot	6	6	Spongebob themed	60	\N	Available	Karen
7	Massage Gun	7	7	Has multiple attachments	30	\N	Available	Nicole
8	Camping Chair	8	8	Has a cup holder	12	\N	Available	Carole
9	Projector	1	9	Works Well	20	\N	Available	Jed
10	Wedding Dress	2	10	In near-perfect condition	45	\N	Available	Sarah
11	Tool Box	3	11	Has all tools needed	10	\N	Available	Barry
12	Foldable Table	4	12	Large and clean	12	\N	Available	James
13	Xbox 360	5	13	Includes Halo & GTA	20	\N	Available	Amanda
14	Stroller	6	14	For babies and dogs, very clean	14	\N	Available	Michelle
15	Kettlebells	7	15	5KG, comes in a set of two	6	\N	Available	Tim
16	Camping Table	8	16	Clean and very handy	14	\N	Available	Georgia
17	Playstation 2	1	17	Works well includes GTA and extra controllers	20	\N	Available	Samuel
18	Gameboy Advance	1	18	Comes with 20 games, good condition	9	\N	Available	Mark
19	Prada Scarf	2	19	Clean and warm	25	\N	Available	Sharon
20	Gucci Suit	2	20	Comes in a set with trousers, jacket and vest	100	\N	Available	Rudy
21	Drill	3	21	Comes with a set of drill bits	40	\N	Available	Andy
22	Chainsaw	3	22	Comes with protective cover	35	\N	Available	Will
23	Set of Dining Chairs	4	23	Comes in a set of 4	50	\N	Available	Kate
24	Book Shelf	4	24	For temporary storage of your books	40	\N	Available	Kevin
25	Monopoly Board Game	5	25	Includes all cards and pieces	7	\N	Available	Samantha
26	Chess Set	5	26	Includes all pieces	7	\N	Available	George
27	Kids Swim Vest	6	27	Helps your kids float	5	\N	Available	Suzie
28	Kids Electric Hummer	6	28	Kids sized electric car, comes with charger	25	\N	Available	Riley
29	Resistance Bands	7	29	Comes with 3 different sizes	10	\N	Available	Jordan
30	Boxing Gloves	7	30	Comes in 3 different sizes, S/M/L	6	\N	Available	Thomas
31	Torch	8	31	Uses AA batteries (included)	2	\N	Available	Eleanor
32	Portable Gas Cooker	8	32	Works well, does not come with gas canister	15	\N	Available	Peter
33	DVD player	1	32	Plays Blue-Rays	18	\N	Available	Peter
\.


--
-- Data for Name: Renters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renters" ("Renter_id", "First_name", "Last_name", "Rating", "Address", "Profile_pic", location) FROM stdin;
7	Nicole	Gorospe	5	\N	\N	\N
8	Carole	Zen	5	\N	\N	\N
9	Jed	Roberts	2	\N	\N	\N
10	Sarah	McNamara	4	\N	\N	\N
11	Barry	Stewart	3	\N	\N	\N
12	James	Bond	2	\N	\N	\N
13	Amanda	Ciccione	5	\N	\N	\N
14	Michelle	Anderson	2	\N	\N	\N
15	Tim	Jones	5	\N	\N	\N
16	Georgia	Smith	2	\N	\N	\N
17	Samuel	Jackson	4	\N	\N	\N
18	Mark	Zuckerberg	1	\N	\N	\N
19	Sharon	Osborne	5	\N	\N	\N
20	Rudy	OnRails	2	\N	\N	\N
21	Andy	Warhol	4	\N	\N	\N
22	Will	Smot	2	\N	\N	\N
23	Kate	Price	3	\N	\N	\N
24	Kevin	Null	2	\N	\N	\N
25	Samantha	Zagare	4	\N	\N	\N
26	George	Washington	2	\N	\N	\N
27	Suzie	Sarroso	5	\N	\N	\N
28	Riley	Summers	1	\N	\N	\N
29	Jordan	Vieola	5	\N	\N	\N
30	Thomas	Wender	2	\N	\N	\N
31	Eleanor	Flower	5	\N	\N	\N
32	Peter	Pan	1	\N	\N	\N
2	Betty	Holberton	5	Federation Square, Melbourne, VIC, 3000	\N	0101000020E6100000C5FEB27BF21E62409B559FABADE842C0
3	Adrian	Liew	5	1 Convention Centre Place, South Wharf, VIC 3006	\N	0101000020E6100000A60A4625751E62407DAEB6627FE942C0
4	Patrick	Star	4	513 Elizabeth St, Melbourne, VIC 3000	\N	0101000020E6100000E9263108AC1E62409EEFA7C64BE742C0
5	Christina	Quach	5	Birdwood Ave, Melbourne, VIC 3004	\N	0101000020E610000068226C787A1F6240FAEDEBC039EB42C0
6	Karen	Compli	1	7 Riverside Quay, Southbank, VIC 3006	\N	0101000020E6100000B459F5B9DA1E62400C022B8716E942C0
1	Bob	Sponge	4	9 Power Street, Melbourne, VIC, 3006	\N	0101000020E6100000D4981073C91E624046239F573CE942C0
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: Items_Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_Category_id_seq"', 1, false);


--
-- Name: Items_Item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_Item_id_seq"', 8, true);


--
-- Name: Renters_Renter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Renters_Renter_id_seq"', 1, false);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("ID");


--
-- Name: Items Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("Item_id");


--
-- Name: Renters Renters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Renters"
    ADD CONSTRAINT "Renters_pkey" PRIMARY KEY ("Renter_id");


--
-- Name: Items FK_Renter_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_Renter_id" FOREIGN KEY ("Renter_id") REFERENCES public."Renters"("Renter_id") NOT VALID;


--
-- Name: Items FK_categories; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_categories" FOREIGN KEY ("Category_id") REFERENCES public."Categories"("ID") NOT VALID;


--
-- PostgreSQL database dump complete
--

