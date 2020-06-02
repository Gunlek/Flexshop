-- Up
CREATE TABLE parameters (
    parameter_id INTEGER PRIMARY KEY,
    parameter_section INT,
    parameter_name TEXT,
    parameter_value TEXT,
    parameter_sort_index INT DEFAULT 0
);

-- Down
DROP TABLE parameters;