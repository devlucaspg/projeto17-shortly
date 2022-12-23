CREATE TABLE users (
    id SERIAL NOT NULL,
    name CHARACTER VARYING(150) NOT NULL,
    email CHARACTER VARYING(50) NOT NULL,
    password CHARACTER VARYING(100) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE urls (
    id SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenUrl" CHARACTER VARYING(6) NOT NULL,
    "visitCount" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "urls_visitCount_check" CHECK (("visitCount" >= 0)),
    CONSTRAINT urls_pkey PRIMARY KEY (id),
    CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id)
);