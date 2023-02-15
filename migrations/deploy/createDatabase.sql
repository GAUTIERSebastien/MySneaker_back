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
        -- REGEX--
        "password" TEXT NOT NULL,
        -- REGEX à vérifier ??--
        "phone" TEXT,
        -- REGEX number*10--
        "firtname" TEXT NOT NULL,
        -- REGEX pas de number--
        "lastname" TEXT NOT NULL,
        -- REGEX pas de number--
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "address" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "id_user" int NOT NULL REFERENCES user(id),
        "address" TEXT NOT NULL,
        "zip_code" TEXT NOT NULL,
        -- REGEX--
        "city" TEXT NOT NULL,
        -- REGEX pas de number--
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "order" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "id_user" int NOT NULL REFERENCES user(id),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "product" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "brand" TEXT NOT NULL,
        "price" DECIMAL NOT NULL,
        --REGEX 0.00--
        "image" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "order_line" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "id_order" INT NOT NULL REFERENCES order(id),
        "id_product" INT NOT NULL REFERENCES product(id),
        "quantity" INT NOT NULL --REGEX >=1--
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "size" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "label" INT NOT NULL --REGEX >=16 à vérifier--
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "tablename" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "id_size" INT NOT NULL REFERENCES size(id),
        "id_product" INT NOT NULL REFERENCES product(id),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

COMMIT;