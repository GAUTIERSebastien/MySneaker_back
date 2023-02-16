-- Deploy mygreensneaker:createDatabase to pg

BEGIN;

CREATE TABLE
    "role" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "label" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "user" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "id_role" int NOT NULL REFERENCES role(id),
        "email" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "phone" TEXT,
        "firstname" TEXT NOT NULL,
        "lastname" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ,
        CONSTRAINT "good_email" CHECK (
            email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
        ),
        CONSTRAINT "french_phone" CHECK (
            phone ~* '/^(0|(?!08|+33 ?8)+33)[1-9]( ?\d{2}){4}$'
        ),
        CONSTRAINT "good_firstname" CHECK (firstname ~* '^[a-zA-ZÀ-ÿ-]+$'),
        CONSTRAINT "good_lastname" CHECK (lastname ~* '^[a-zA-ZÀ-ÿ-]+$')
    );

CREATE TABLE
    " address " (
        " id " INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        " id_user " INT NOT NULL REFERENCES "user"(id),
        " address " TEXT NOT NULL,
        " zip_code " TEXT,
        " city " TEXT NOT NULL,
        " created_at " TIMESTAMPTZ NOT NULL DEFAULT now(),
        " updated_at " TIMESTAMPTZ,
        CONSTRAINT "french_zip_code" CHECK (zip_code ~* '^\d{5}$'),
        CONSTRAINT "french_city" CHECK (city ~* '^[a-zA-ZÀ-ÿ-]+$')
    );

CREATE TABLE
    " order " (
        " id " INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        " id_user " int NOT NULL REFERENCES user(id),
        " created_at " TIMESTAMPTZ NOT NULL DEFAULT now(),
        " updated_at " TIMESTAMPTZ
    );

CREATE TABLE
    " product " (
        " id " INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        " title " TEXT NOT NULL,
        " description " TEXT NOT NULL,
        " brand " TEXT NOT NULL,
        " price " NUMERIC (10, 2) NOT NULL,
        -- 10 chiffres et 2 après la virgule--
        " image " TEXT NOT NULL,
        " created_at " TIMESTAMPTZ NOT NULL DEFAULT now(),
        " updated_at " TIMESTAMPTZ,
    );

CREATE TABLE
    " order_line " (
        " id " INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        " id_order " INT NOT NULL REFERENCES order(id),
        " id_product " INT NOT NULL REFERENCES product(id),
        " quantity " INT NOT NULL,
        " created_at " TIMESTAMPTZ NOT NULL DEFAULT now(),
        " updated_at " TIMESTAMPTZ,
        ADD
            CONSTRAINT "minimal_quantity" CHECK (quantity >= 1)
    );

CREATE TABLE
    " size " (
        " id " INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        " label " INT NOT NULL,
        " created_at " TIMESTAMPTZ NOT NULL DEFAULT now(),
        " updated_at " TIMESTAMPTZ,
        ADD
            CONSTRAINT "minimal_size" CHECK (size >= 16)
    );

CREATE TABLE
    " size_to_product " (
        " id " INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        " id_size " INT NOT NULL REFERENCES size(id),
        " id_product " INT NOT NULL REFERENCES product(id),
        " created_at " TIMESTAMPTZ NOT NULL DEFAULT now(),
        " updated_at " TIMESTAMPTZ
    );

COMMIT;