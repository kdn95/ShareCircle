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

SET default_tablespace = '';

SET default_table_access_method = heap;

DROP TABLE IF EXISTS public."Items" CASCADE;
DROP TABLE IF EXISTS public."Categories" CASCADE;

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

CREATE TABLE public."Renters" (
    "Renter_id" integer NOT NULL,
    "First_name" text NOT NULL,
    "Last_name" text,
    "Rating" integer,
    "Address" text,
    "Profile_pic" text
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
1	Drone	1	\N	Great Drone	35	\N	Available	Bob
2	Chanel Jumper	2	\N	Vintage	45	\N	Available	Betty
3	Jack Hammer	3	\N	One hell of a good Jack Hammer	30	\N	Available	Adrian
4	Couch	4	\N	Limited edition	80	\N	Available	Patrick
5	Nintendo Switch	5	\N	Has Animal Crossing	40	\N	Available	Christina
6	Baby Cot	6	\N	Spongebob themed	60	\N	Available	Karen
7	Massage Gun	7	\N	Has multiple attachments	30	\N	Available	Nicole
8	Camping Chair	8	\N	Has a cup holder	12	\N	Available	Carole
9	Projector	1	\N	Works Well	20	\N	Available	Jed
10	Wedding Dress	2	\N	In near-perfect condition	45	\N	Available	Sarah
11	Tool Box	3	\N	Has all tools needed	10	\N	Available	Barry
12	Foldable Table	4	\N	Large and clean	12	\N	Available	James
13	Xbox 360	5	\N	Includes Halo & GTA	20	\N	Available	Amanda
14	Stroller	6	\N	For babies and dogs, very clean	14	\N	Available	Michelle
15	Kettlebells	7	\N	5KG, comes in a set of two	6	\N	Available	Tim
16	Camping Table	8	\N	Clean and very handy	14	\N	Available	Georgia
17	Playstation 2	1	\N	Works well includes GTA and extra controllers	20	\N	Available	Samuel
18	Gameboy Advance	1	\N	Comes with 20 games, good condition	9	\N	Available	Mark
19	Prada Scarf	2	\N	Clean and warm	25	\N	Available	Sharon
20	Gucci Suit	2	\N	Comes in a set with trousers, jacket and vest	100	\N	Available	Rudy
21	Drill	3	\N	Comes with a set of drill bits	40	\N	Available	Andy
22	Chainsaw	3	\N	Comes with protective cover	35	\N	Available	Will
23	Set of Dining Chairs	4	\N	Comes in a set of 4	50	\N	Available	Kate
24	Book Shelf	4	\N	For temporary storage of your books	40	\N	Available	Kevin
25	Monopoly Board Game	5	\N	Includes all cards and pieces	7	\N	Available	Samantha
26	Chess Set	5	\N	Includes all pieces	7	\N	Available	George
27	Kids Swim Vest	6	\N	Helps your kids float	5	\N	Available	Suzie
28	Kids Electric Hummer	6	\N	Kids sized electric car, comes with charger	25	\N	Available	Riley
29	Resistance Bands	7	\N	Comes with 3 different sizes	10	\N	Available	Jordan
30	Boxing Gloves	7	\N	Comes in 3 different sizes, S/M/L	6	\N	Available	Thomas
31	Torch	8	\N	Uses AA batteries (included)	2	\N	Available	Eleanor
32	Portable Gas Cooker	8	\N	Works well, does not come with gas canister	15	\N	Available	Peter
\.


--
-- Data for Name: Renters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Renters" ("Renter_id", "First_name", "Last_name", "Rating", "Address", "Profile_pic") FROM stdin;
1	Bob	Sponge	4	123 Smith Street, Melbourne 3000 Victoria	\N
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

