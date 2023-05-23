/*Queries to set up the database*/

CREATE DATABASE personalbudget;

CREATE TABLE envelopes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    budget REAL,
    creation_date DATE DEFAULT NOW()
);

INSERT INTO envelopes (title, budget)
VALUES ('rent', 500), 
('groceries', 220), 
('gas', 200),
('srvices', 150), 
('healthcare', 50),
('others', 100),
('savings', 150);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    from_id INTEGER NOT NULL,
    to_id INTEGER NOT NULL,
    amount INTEGER DEFAULT 0,
    created_at DATE DEFAULT NOW(),
    FOREIGN  KEY (from_id) REFERENCES envelopes(id),
    FOREIGN  KEY (to_id) REFERENCES envelopes(id)
    );

INSERT INTO transactions (from_id, to_id, amount)
VALUES (6, 7, 50);

UPDATE envelopes
SET budget = (budget - 50)
WHERE id = 6;

UPDATE envelopes
 SET budget = (budget + 50)
 WHERE id = 7;