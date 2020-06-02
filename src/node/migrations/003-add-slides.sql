-- Up
CREATE TABLE slides (
    slide_id INTEGER PRIMARY KEY,
    slide_number INTEGER,
    slide_machine INTEGER,
    slide_title TEXT,
    slide_image TEXT,
    slide_description TEXT
);

-- Down
DROP TABLE slides;