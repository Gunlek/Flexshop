-- Up
CREATE TABLE parameters (
    parameter_id INTEGER PRIMARY KEY,
    parameter_section INT,
    parameter_name TEXT,
    parameter_value TEXT
);

-- Down
DROP TABLE parameters;