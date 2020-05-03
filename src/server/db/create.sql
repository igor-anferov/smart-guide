set DATESTYLE to "DMY";

BEGIN;
CREATE TABLE IF NOT EXISTS BaseElements (
  base_element_id serial primary key,
  title varchar,
  category varchar,
  type varchar,
  is_pivotal boolean,
  body bytea,
  source varchar,
  author_id int,
  created timestamp,
  clipboard boolean
);

CREATE TABLE IF NOT EXISTS Materials (
  material_id serial primary key,
  title varchar,
  author_id int,
  created timestamp,
  forks_from int,
  views_count int,
  clipboard boolean
);

CREATE TABLE IF NOT EXISTS MaterialBaseElements (
  material_id int,
  position int,
  base_element_id int
);

CREATE TABLE IF NOT EXISTS RelatedMaterials (
  material_id int,
  related_material_id int
);

CREATE TABLE IF NOT EXISTS Questions (
  question_id serial primary key,
  text varchar,
  author_id int,
  created timestamp,
  forks_from int,
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
  created timestamp,
  forks_from int,
  delete_mark boolean default false
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


CREATE TABLE IF NOT EXISTS BaseElementTags (
  base_element_id int,
  tag varchar,
  primary key(base_element_id, tag)
);

CREATE TABLE IF NOT EXISTS MaterialTags (
  material_id int,
  tag varchar,
  primary key(material_id, tag)
);

CREATE TABLE IF NOT EXISTS QuestionTags (
  question_id int,
  tag varchar,
  primary key(question_id, tag)
);

CREATE TABLE IF NOT EXISTS ExamTags (
  exam_id int,
  tag varchar,
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

alter table MaterialBaseElements add
  foreign key (base_element_id)
  references BaseElements(base_element_id) ON DELETE CASCADE,
    add
  foreign key (material_id)
  references Materials(material_id) ON DELETE CASCADE;

alter table QuestionMaterials add
  foreign key (question_id)
  references Questions(question_id) ON DELETE CASCADE,
    add
  foreign key (material_id)
  references Materials(material_id) ON DELETE CASCADE;

alter table ExamQuestions add
  foreign key (question_id)
  references Questions(question_id) ON DELETE CASCADE,
    add
  foreign key (exam_id)
  references Exams(exam_id) ON DELETE CASCADE;

alter table BaseElementTags add
  foreign key (base_element_id)
  references BaseElements(base_element_id) ON DELETE CASCADE;

alter table MaterialTags add
  foreign key (material_id)
  references Materials(material_id) ON DELETE CASCADE;

alter table QuestionTags add
  foreign key (question_id)
  references Questions(question_id) ON DELETE CASCADE;

alter table ExamTags add
  foreign key (exam_id)
  references Exams(exam_id) ON DELETE CASCADE;

alter table MaterialComments add 
  foreign key (material_id)
  references Materials(material_id) ON DELETE CASCADE;

alter table RelatedMaterials add 
  foreign key (material_id)
  references Materials(material_id) ON DELETE CASCADE,
    add
  foreign key (related_material_id) 
  references Materials(material_id) ON DELETE CASCADE;

CREATE INDEX title_base_element_index ON BaseElements USING GIN (to_tsvector('russian', title));
CREATE INDEX title_material_index ON Materials USING GIN (to_tsvector('russian', title));
CREATE INDEX text_questions_index ON Questions USING GIN (to_tsvector('russian', text));
CREATE INDEX title_exam_index ON Exams USING GIN (to_tsvector('russian', title));

COMMIT;
