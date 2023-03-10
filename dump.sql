PGDMP                         z         
   shortly_db #   14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    41278 
   shortly_db    DATABASE     r   CREATE DATABASE shortly_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE shortly_db;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            ?            1259    49163    urls    TABLE     R  CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "originalUrl" text NOT NULL,
    "shortenUrl" character varying(6) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    CONSTRAINT "urls_visitCount_check" CHECK (("visitCount" >= 0))
);
    DROP TABLE public.urls;
       public         heap    postgres    false    4            ?            1259    49162    urls_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.urls_id_seq;
       public          postgres    false    4    212            	           0    0    urls_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;
          public          postgres    false    211            ?            1259    49153    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            ?            1259    49152    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210    4            
           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            h           2604    49166    urls id    DEFAULT     b   ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);
 6   ALTER TABLE public.urls ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            f           2604    49156    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210                      0    49163    urls 
   TABLE DATA           d   COPY public.urls (id, "userId", "originalUrl", "shortenUrl", "visitCount", "createdAt") FROM stdin;
    public          postgres    false    212   &       ?          0    49153    users 
   TABLE DATA           G   COPY public.users (id, name, email, password, "createdAt") FROM stdin;
    public          postgres    false    210   ?                  0    0    urls_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.urls_id_seq', 8, true);
          public          postgres    false    211                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    209            q           2606    49173    urls urls_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_pkey;
       public            postgres    false    212            m           2606    49161    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    210            o           2606    49159    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            r           2606    49174    urls urls_userId_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 A   ALTER TABLE ONLY public.urls DROP CONSTRAINT "urls_userId_fkey";
       public          postgres    false    212    3183    210               J  x?u?[O?0???_???VhK?!!fs?5[f?!1!?u????Kfb?????~??X??X????m[tT??C?"???Q|?????7V#??&??#?N?k?.&?S/ɷ??g=Q,?\??<??V?aH`b?ǤO?f??Ȥ??????A5?ܥ?=?Ak>N?u???0s	???S???LU!K???$MR??(t?0??n?U??e???'؁6??|?E?V}???ʫ?u?{?#L?ҋ?_:C??&޼???:1>??(?ǩ؋?x9QI???}?A?%???m??9??':??B?'?#Q{?~??.??.Z?$?bsm?? ?_???       ?   =  x?mϻr?@@??"????? ?U?Q?8i????r_'?????????:?+!???p??RfG?G??^?/??!?|?p!ْ\󁉼R?2????TJ?5w<??ٻ???)LHH???GX?$?(E",?s?	?{??V????^???xA?a?(zX"?@M??[?L?yDf?3)om?ϓ??`?@Ez?NQv?n}??4.5#,v+??????zba7m?%??8_mL	2????{???$Ea
%a???d?w???*z?#T???.??6E??6t?EI?xE?,?*???d??E??'{ ?)Q???DQ?7A??     