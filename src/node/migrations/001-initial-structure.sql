-- Up
CREATE TABLE workshops (
    workshop_id INTEGER PRIMARY KEY,
    workshop_title VARCHAR(512),
    workshop_image VARCHAR(512)
);

CREATE TABLE machines (
    machine_id INTEGER PRIMARY KEY,
    machine_title VARCHAR(512),
    machine_category INT,
    machine_brand VARCHAR(512),
    machine_image VARCHAR(512),
    machine_reference VARCHAR(512)
);

CREATE TABLE sections (
    section_id INTEGER PRIMARY KEY,
    section_machine INT,
    section_type VARCHAR(512),
    section_title VARCHAR(512),
    section_description TEXT,
    section_video_links TEXT,
    section_video_titles TEXT
);

CREATE TABLE category (
    category_id INTEGER PRIMARY KEY,
    category_title VARCHAR(512),
    category_workshop INT
)

-- Down
DROP TABLE workshops;
DROP TABLE machines;
DROP TABLE sections;