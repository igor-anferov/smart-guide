
set DATESTYLE to "DMY";

CREATE TABLE Elements ( 
  id_element int primary key,
  type_element varchar,
  key_element bool,
  body_element bytea,
  sourse varchar,
  id_group int,
  id_author int,
  date_added timestamp
);

CREATE TABLE Objects (
  id_object int,
  number_version int,
  snippet varchar,
  id_group int,
  id_author int,
  date_added date,
  body_object int[],
  count_added int,
  count_views int,
  reletion_objects int[],
  primary key(id_object, number_version)
);

CREATE TABLE Questions (
  id_question int,
  number_version int,
  text_question varchar,
  answer jsonb,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(id_question, number_version)
);

CREATE TABLE List_questions (
  id_list_questions int,
  number_version int,
  id_group int,
  name_exam varchar,
  questions jsonb,
  date_added date,
  primary key(id_list_questions, id_group)
);

CREATE TABLE Users ( 
  id_user int primary key,
  e_mail varchar unique,
  name_user varchar unique,
  university varchar,
  faculty varchar,
  password_hash varchar,
  date_registresion timestamp,
  date_last_login timestamp
);

CREATE TABLE Groups ( 
  id_group int primary key,
  name_group varchar,
  id_creator int,
  date_creation timestamp
);

create table group_members (
  id_group int,
  id_user int,
  date_entry timestamp,
  date_exit timestamp,
  name_group varchar,
  primary key(id_group, id_user)
);

create table Name_users (
  id_user1 int,
  id_user2 int,
  name_user2 varchar,
  primary key(id_user1, id_user2)
);

CREATE TABLE Comments ( 
  id_comment int primary key,
  text_comment varchar,
  id_object int,
  id_group int,
  id_author int,
  date_added timestamp,
  visibility_area int[]
);

create table Tags_objects (
  name_tag varchar,
  id_object int,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(name_tag, id_object)
);

create table Tags_questions (
  name_tag varchar,
  id_questions int,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(name_tag, id_questions)
);

create table Tags_list_questions  (
  name_tag varchar,
  id_list_questions int,
  id_group int,
  id_author int,
  date_added timestamp,
  primary key(name_tag, id_list_questions)
);
 
