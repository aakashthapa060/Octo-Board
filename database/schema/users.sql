CREATE TABLE users (
	user_id UUID NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	user_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	gender VARCHAR(1) NOT NULL,
	moderator BOOLEAN DEFAULT 'f' NOT NULL,
	created_on DATE NOT NULL DEFAULT CURRENT_DATE,
	UNIQUE(user_name),
	UNIQUE(email)
)

ALTER TABLE person ADD CONSTRAINT gender_contraint CHECK (gender="F" OR gender = 'M' OR gender = 'O');
INSERT INTO users(user_id,first_name,last_name,user_name,email,password) 
VALUES (uuid_generate_v4(), 'Aakash', 'Thapa', 'aakash_thapa', 'aakashmanm3@gmail.com', 'Jaynepal123');