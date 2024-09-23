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

CREATE TABLE IF NOT EXISTS public."Categories" (
    "ID" integer NOT NULL,
    "Name" text
);

ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Insert or Update Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Categories" ("ID", "Name") VALUES
(7, 'Health & Fitness'),
(8, 'Outdoor'),
(6, 'Baby & Kids'),
(5, 'Entertainment'),
(4, 'Furniture'),
(3, 'Tools & Equipment'),
(2, 'Clothes'),
(1, 'Electronics')
ON CONFLICT ("ID") DO UPDATE SET
    "Name" = EXCLUDED."Name";

--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("ID");

-- PostgreSQL database dump complete
--
