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

--
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    "ID" integer NOT NULL,
    "Name" text
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Items" (
    "Item_id" integer NOT NULL,
    "Item_name" text,
    "Category_id" integer NOT NULL,
    "Renter_id" integer,
    "Description" text,
    "Price_per_day" integer,
    "Image_url" text,
    "Availability" text
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
-- Name: Items Item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "Item_id" SET DEFAULT nextval('public."Items_Item_id_seq"'::regclass);


--
-- Name: Items Category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "Category_id" SET DEFAULT nextval('public."Items_Category_id_seq"'::regclass);


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

COPY public."Items" ("Item_id", "Item_name", "Category_id", "Renter_id", "Description", "Price_per_day", "Image_url", "Availability") FROM stdin;
1	Drone	1	\N	Great Drone	35	\N	Available
2	Chanel Jumper	2	\N	Vintage	45	\N	Available
3	Jack Hammer	3	\N	One hell of a good Jack Hammer	30	\N	Available
4	Couch	4	\N	Limited edition	80	\N	Available
5	Nintendo Switch	5	\N	Has Animal Crossing	40	\N	Available
6	Baby Cot	6	\N	Spongebob themed	60	\N	Available
7	Massage Gun	7	\N	Has multiple attachments	30	\N	Available
8	Camping Chair	8	\N	Has a cup holder	12	\N	Available
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
-- Name: Items FK_categories; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_categories" FOREIGN KEY ("Category_id") REFERENCES public."Categories"("ID") NOT VALID;


--
-- PostgreSQL database dump complete
--

