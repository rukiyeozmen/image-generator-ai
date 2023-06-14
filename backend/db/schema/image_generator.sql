DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Images CASCADE;
DROP TABLE IF EXISTS Captions CASCADE;

CREATE TABLE Users(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PASSWORD VARCHAR(255) NOT NULL
);

CREATE TABLE Images(
  id SERIAL PRIMARY KEY NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  keyword VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE Captions(
  id SERIAL PRIMARY KEY NOT NULL,
  caption VARCHAR(255) NOT NULL,
  shared_at TIMESTAMP DEFAULT now(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image_id INTEGER REFERENCES images(id) ON DELETE CASCADE
);

CREATE TABLE Themes(
  id SERIAL PRIMARY KEY NOT NULL,
  label VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);