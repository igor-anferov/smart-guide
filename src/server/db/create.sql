set DATESTYLE to "DMY";

BEGIN;
CREATE TABLE IF NOT EXISTS BaseElements (
  element_id serial primary key,
  title varchar,
  category varchar,
  type varchar,
  key_element boolean,
  body bytea,
  source varchar,
  group_id int,
  author_id int,
  created timestamp,
  clipboard boolean
);

CREATE TABLE IF NOT EXISTS Materials (
  material_id serial primary key,
  snippet varchar,
  group_id int,
  author_id int,
  created timestamp,
  forks_count int,
  views_count int,
  clipboard boolean
);

CREATE TABLE IF NOT EXISTS MaterialBaseElements (
  material_id int,
  position int,
  element_id int
);

CREATE TABLE IF NOT EXISTS RelatedMaterials (
  material_id int,
  related_material_id int
);

CREATE TABLE IF NOT EXISTS Questions (
  question_id serial primary key,
  text varchar,
  group_id int,
  author_id int,
  created timestamp,
  clipboard boolean
);

CREATE TABLE IF NOT EXISTS QuestionMaterials (
  question_id int,
  position int,
  material_id int
);

CREATE TABLE IF NOT EXISTS Exams (
  exam_id serial primary key,
  group_id int,
  author_id int,
  title varchar,
  teacher varchar,
  created timestamp
);

CREATE TABLE IF NOT EXISTS ExamQuestions (
  exam_id int,
  position int,
  question_id int
);

CREATE TABLE IF NOT EXISTS Users (
  user_id serial primary key,
  login varchar unique,
  hs256_sha256 char(64),
  email varchar unique,
  name varchar,
  university varchar,
  faculty varchar,
  created timestamp
);

CREATE TABLE IF NOT EXISTS Books (
  book_id serial primary key,
  title varchar,
  user_id int,
  content bytea
);

CREATE TABLE IF NOT EXISTS Groups (
  group_id serial primary key,
  name varchar null,
  creator_id int,
  created timestamp
);

CREATE TABLE IF NOT EXISTS GroupMembers (
  group_id int,
  user_id int,
  date_entry timestamp,
  date_exit timestamp,
  primary key(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS Contacts (
  user_id int,
  contact_id int,
  alias varchar,
  primary key(user_id, contact_id)
);


CREATE TABLE IF NOT EXISTS MaterialComments (
  comment_id serial primary key,
  text varchar,
  material_id int,
  group_id int,
  author_id int,
  created timestamp
);

CREATE TABLE IF NOT EXISTS MaterialTags (
  material_id int,
  tag varchar,
  group_id int,
  author_id int,
  created timestamp,
  primary key(material_id, tag)
);

CREATE TABLE IF NOT EXISTS QuestionTags (
  question_id int,
  tag varchar,
  group_id int,
  author_id int,
  created timestamp,
  primary key(question_id, tag)
);

CREATE TABLE IF NOT EXISTS ExamTags (
  exam_id int,
  tag varchar,
  group_id int,
  author_id int,
  created timestamp,
  primary key(exam_id, tag)
);


alter table GroupMembers add
	foreign key (user_id)
	references Users(user_id),
    add
	foreign key (group_id)
	references Groups(group_id);

alter table Books add
	foreign key (user_id)
	references Users(user_id);

alter table Contacts add
	foreign key (user_id)
	references Users(user_id),
    add
	foreign key (contact_id)
	references Users(user_id);

/*alter table BaseElements add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table Materials add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table questions add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table list_questions add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table comments add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table tags_objects add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table tags_questions add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);

alter table tags_list_questions add
	foreign key (group_id, author_id)
	references group_members(group_id, user_id);*/
COMMIT;
