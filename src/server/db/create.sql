set DATESTYLE to "DMY";

BEGIN;
CREATE TABLE IF NOT EXISTS Elements (
  id_element serial primary key,
  title varchar,
  category varchar,
  type varchar,
  key_element boolean,
  body bytea,
  source varchar,
  id_group int,
  id_author int,
  date_added timestamp,
  clipboard boolean 
);

CREATE TABLE IF NOT EXISTS Objects (
  id_object serial unique,
  number_version int,
  snippet varchar,
  id_group int,
  id_author int,
  date_added timestamp,
  count_added int,
  count_views int,
  primary key(id_object, number_version)
);

CREATE TABLE IF NOT EXISTS body_object (
  id_object int,
  number_version int,
  id_element int 
);

CREATE TABLE IF NOT EXISTS linked_object (
  id_object1 int,
  number_version1 int,
  id_object2 int,
  number_version2 int
);

CREATE TABLE IF NOT EXISTS  Questions (
  id_question serial unique,
  number_version int,
  text_question varchar,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(id_question, number_version)
);

CREATE TABLE IF NOT EXISTS  answer (
  id_question int,
  number_version_q int,
  id_object int,
  number_version_o int
);

CREATE TABLE IF NOT EXISTS List_questions (
  id_list_questions serial unique,
  number_version int,
  id_group int,
  id_author int,
  name_exam varchar,
  name_teacher varchar,
  date_added timestamp,
  date_exam timestamp,
  primary key(id_list_questions, number_version)
);

CREATE TABLE IF NOT EXISTS array_answer (
  id_list_questions int,
  number_version1 int,
  id_question int,
  number_version2 int
);

CREATE TABLE IF NOT EXISTS Users (
  id_user serial primary key,
  login varchar unique,
  hs256_sha256 char(64),
  registration_ts timestamp,
  email varchar unique,
  university varchar,
  faculty varchar
);

CREATE TABLE IF NOT EXISTS Books_PDF (
  book_id serial primary key,
  title varchar,
  id_user int,
  content bytea
);

CREATE TABLE IF NOT EXISTS Groups (
  id_group serial primary key,
  name_group varchar null,
  id_creator int,
  date_added timestamp
);

CREATE TABLE IF NOT EXISTS group_members (
  id_user int,
  id_group int,
  date_entry timestamp,
  date_exit timestamp,
  name_group varchar,
  primary key(id_group, id_user)
);

CREATE TABLE IF NOT EXISTS  Name_users (
  id_user1 int,
  id_user2 int,
  name_user2 varchar,
  primary key(id_user1, id_user2)
);


CREATE TABLE IF NOT EXISTS Comments (
  id_comment serial primary key,
  text_comment varchar,
  id_object int,
  id_group int,
  id_author int,
  date_added timestamp,
  visibility_area int[]
);

CREATE TABLE IF NOT EXISTS tags_objects (
  name_tag varchar,
  id_object int,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(name_tag, id_object)
);

CREATE TABLE IF NOT EXISTS tags_questions (
  name_tag varchar,
  id_question int,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(name_tag, id_question)
);

CREATE TABLE IF NOT EXISTS tags_list_questions (
  name_tag varchar,
  id_list_questions int,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(name_tag, id_list_questions)
);

COMMIT;

BEGIN; 

alter table group_members add
	foreign key (id_user)
	references Users(id_user),
    add 
	foreign key (id_group)
	references Groups(id_group);

alter table Books_PDF add
	foreign key (id_user)
	references Users(id_user);

alter table name_users add
	foreign key (id_user1)
	references Users(id_user),
    add 
	foreign key (id_user2)
	references Users(id_user); 

/*alter table Elements add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table Objects add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table questions add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table list_questions add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table comments add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table tags_objects add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table tags_questions add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);

alter table tags_list_questions add
	foreign key (id_group, id_author)
	references group_members(id_group, id_user);*/
COMMIT;
