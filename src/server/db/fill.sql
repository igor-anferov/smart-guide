BEGIN;

INSERT INTO Users (login, hs256_sha256, email) VALUES 
	('user', '1815e513d9176266ea9719b2c3722fe7c2b92c35295b4236292caa329dae6c84', 'user@mail.ru'),
	('prodolban', '3245e513d9176266ea9719b2c3722fe7c2b92c35295b4236292caa329dae6c89', 'prodolban@mail.ru');

INSERT INTO Groups (name_group, id_creator, date_added) VALUES
	('me and my friend prodolban', 1, '20/04/2020 19:30:07');

INSERT INTO Books_PDF (title, id_user, pdf_path) VALUES
	('А.В.Столяров. Низкоуровневое программирование', 1, 'dir_pdf1/slolarov.pdf'),
	('Ким, Ильин. Линейная алгебра и аналитическая геометрия', 1, 'dir_pdf1/kim.pdf'),
	('Ильин. Садовничий. Математический анализ', 1, 'dir_pdf1/ma.pdf');

INSERT INTO List_questions  (number_version, id_group, id_author, name_exam, name_teacher, date_added,
	date_exam) VALUES 
	(0, 1, 1, 'Линейная алгебра и аналитическая геометрия', 'Ким Галина Динховна', '20/04/2020 21:03:57', '02/06/2020 10:00:00'),
	(0, 1, 1, 'Математический анализ', 'Фомичёв Василий Владимирович', '20/05/2020 20:37:01', '08/06/2020 09:00:00'),
	(0, 1, 1, 'Архитектура ЭВМ и язык ассемблера', 'Столяров Андрей Викторович', '27/05/2020 17:56:31', '14/06/2020 12:00:00');

INSERT INTO Questions (number_version, text_question, id_group, id_author, date_added) VALUES 
--	(1 - 20)
	(0, 'Отыскание точек локального экстремума функции. Достаточные условия экстремума', 1, 1, '20/05/2020 21:31:57'),
	(0, 'Направление выпуклости графика функции и точки перегиба. Достаточные условия перегиба.', 1, 1, '20/05/2020 21:32:57'),
	(0, 'Асимптоты графика функции. Общая схема исследования графиков функций', 1, 1, '20/05/2020 21:33:57'),
	(0, 'Понятие интегрируемости функции. Леммы Дарбу о верхних и нижних суммах', 1, 1, '20/05/2020 21:34:57'),
	(0, 'Необходимое и достаточное условие интегрируемости', 1, 1, '20/05/2020 21:35:57'),
	(0, 'Классы интегрируемых функций', 1, 1, '20/05/2020 21:31:57'),
	(0, 'Основные свойства определенного интеграла. Оценки интегралов. Формулы среднего значения', 1, 1, '20/05/2020 21:36:57'),
	(0, 'Основная формула интегрального исчисления. Формулы замены переменного и интегрирования по частям', 1, 1, '20/05/2020 21:37:57'),
	(0, 'Понятие длины плоской кривой. Формулы для вычисления длины дуги кривой', 1, 1, '20/05/2020 21:31:57'),
	(0, 'Понятие квадрируемости (площади) плоской фигуры. Площадь криволинейной трапеции и криволинейного сектора', 1, 1, '20/05/2020 21:38:57'),
	(0, 'Объем тела', 1, 1, '20/05/2020 21:31:57'),
	(0, 'Абсолютная сходимость несобственных интегралов. Формулы замены переменного и интегрирования по частям для несобственных интегралов', 1, 1, '20/05/2020 21:39:57'),
	(0, 'Метод хорд и его обоснованиеПризнак Абеля-Дирихле. Главное значение несобственного интеграла', 1, 1, '20/05/2020 21:40:57'),
	(0, 'Метод касательных и его обоснование', 1, 1, '20/05/2020 21:31:57'),
	(0, 'Приближенные методы вычисления определенных интегралов ( для одного из методов вывести оценку погрешности )', 1, 1, '20/05/2020 21:41:57'),
	(0, 'Различные множества точек и последовательности точек N-мерного пространства. Теорема Больцано-Вейерштрасса', 1, 1, '20/05/2020 21:42:57'),
	(0, 'Понятие функции N-переменных и ее предельного значения', 1, 1, '20/05/2020 21:43:57'),
	(0, 'Непрерывность функции N-переменных. Основные теоремы о непрерывных функциях', 1, 1, '20/05/2020 21:44:57'),
	(0, 'Понятие дифференцируемости функции. Достаточное условие дифференцируемости. Касательная плоскость к поверхности', 1, 1, '20/05/2020 21:45:57'),
	(0, 'Дифференцирование сложной функции нескольких переменных. Инвариантность формы 1‒го дифференциала.', 1, 1, '20/05/2020 21:45:57'),
--  (21 - 40)
	(0, 'Система регистров процессора i386', 1, 1, '28/05/2020 21:42:57'),
	(0, 'Команды процессора i386: операнды, типы операндов, разрядность операндов', 1, 1, '29/05/2020 21:43:57'),
	(0, 'команда MOV и её пять основных форм в зависимости от типов операндов', 1, 1, '28/05/2020 21:44:57'),
	(0, 'Прямая и косвенная адресация памяти в процессоре i386; общий вид исполнительного адреса, команда LEA', 1, 1, '29/05/2020 21:45:57'),
	(0, 'сложение, вычитание и сравнение целых чисел; влияние этих операций на регистр флагов', 1, 1, '29/05/2020 21:42:57'),
	(0, 'операции увеличения и уменьшения на единицу, операция смены знака, влияние этих операций на регистр флагов', 1, 1, '29/05/2020 21:56:57'),
	(0, 'умножение целых чисел (знаковых и беззнаковых); влияние операций умножения на регистр флагов', 1, 1, '28/05/2020 21:57:57'),
	(0, 'деление целых чисел (знаковых и беззнаковых); исключительные ситуации, связанные с делением', 1, 1, '29/05/2020 21:59:57'),
	(0, 'операции знакового и беззнакового расширения разрядности', 1, 1, '30/05/2020 21:42:57'),
	(0, 'побитовые логические операции', 1, 1, '20/05/2020 21:43:57'),
	(0, 'операции простого и арифметического побитового сдвига', 1, 1, '31/05/2020 21:44:57'),
	(0, 'классификация команд передачи управления в зависимости от <<дальности>>', 1, 1, '29/05/2020 21:45:57'),
	(0, 'прямая и косвенная адресация в командах передачи управления, использование абсолютной и относительной адресации', 1, 1, '28/05/2020 21:45:57'),
	(0, 'команда безусловного перехода и её возможные формы', 1, 1, '29/05/2020 21:42:57'),
	(0, 'команды условных переходов в зависимости от значения отдельных флагов', 1, 1, '30/05/2020 21:43:57'),
	(0, 'команды условных переходов в зависимости от результата операции над знаковыми числами', 1, 1, '23/05/2020 21:44:57'),
	(0, 'команды условных переходов в зависимости от результата операции над беззнаковыми числами', 1, 1, '28/05/2020 21:45:57'),
	(0, 'Организация ветвления (оператора if-else) с помощью команд условных и безусловных переходов', 1, 1, '29/05/2020 21:45:57'),
	(0, 'Организация циклов с предусловием и постусловием с помощью команд условных и безусловных переходов', 1, 1, '30/05/2020 21:42:57'),
	(0, 'команды LOOP и JECXZ, LOOPE/LOOPZ, LOOPNE/LOOPNZ; организация арифметических циклов', 1, 1, '31/05/2020 21:43:57'),
--  (41 - 60) 
	(0, 'Линейное пространство над произвольным полем. Ранг и база системы векторов.', 1, 1, '27/05/2020 21:43:57'),
	(0, 'Изоморфизм линейных пространств', 1, 1, '23/05/2020 21:44:57'),
	(0, 'Сумма и пересечение линейных пространств.', 1, 1, '28/05/2020 21:45:57'),
	(0, 'Прямая сумма линейных пространств.', 1, 1, '29/05/2020 21:45:57'),
	(0, 'Евклидово и унитарное пространство. Неравенство Коши‒Буняковского‒Шварца.', 1, 1, '30/05/2020 21:42:57'),
	(0, 'Скалярное произведение в ортонормированном базисе. Существование ОНБ.', 1, 1, '31/05/2020 21:43:57'),
	(0, 'Изометрия.', 1, 1, '30/05/2020 21:43:57'),
	(0, 'Матрица Грама. Критерий линейной зависимости.', 1, 1, '23/05/2020 21:44:57'),
	(0, 'Ортогональное дополнение. Ортогональная сумма подпространств. Расстояние от вектора до подпространства.', 1, 1, '28/05/2020 21:45:57'),
	(0, 'Ортонормированный базис и унитарные (ортогональные) матрицы.', 1, 1, '29/05/2020 21:45:57'),
	(0, 'Процесс ортогонализации Грама‒Шмидта. QR‒разложение матрицы.', 1, 1, '30/05/2020 21:42:57'),
	(0, 'Линейное афинное  многообразие в линейном пр‒ве. Гиперплоскость.', 1, 1, '31/05/2020 21:43:57'),
	(0, 'Линейные операторы (ЛО). Матрица ЛО.', 1, 1, '30/05/2020 21:43:57'),
	(0, 'Матрица ЛО при переходе к другому базису. Эквивалентность и подобие матриц.', 1, 1, '23/05/2020 21:44:57'),
	(0, 'Линейное пр‒во ЛО и матриц.', 1, 1, '28/05/2020 21:45:57'),
	(0, 'Произведение ЛО и его матрица.', 1, 1, '29/05/2020 21:45:57'),
	(0, 'Ядро и образ ЛО. Каноническая пара базисов.', 1, 1, '30/05/2020 21:42:57'),
	(0, 'Линейные функционалы. Сопряженное пр‒во. Линейные функционалы и гиперплоскости.', 1, 1, '31/05/2020 21:43:57'),
	(0, 'Обратный оператор и критерий обратимости.', 1, 1, '30/05/2020 21:43:57'),
	(0, 'Собственные значения и векторы. Операторы простой структуры и диагонализуемые матрицы.', 1, 1, '23/05/2020 21:44:57');


INSERT INTO array_answer (id_list_questions, number_version1, id_question, number_version2) VALUES
	(2, 0, 1, 0),
	(2, 0, 2, 0),
	(2, 0, 3, 0),
	(2, 0, 4, 0),
	(2, 0, 5, 0),
	(2, 0, 6, 0),
	(2, 0, 7, 0),
	(2, 0, 8, 0),
	(2, 0, 9, 0),
	(2, 0, 10, 0),
	(2, 0, 11, 0),
	(2, 0, 12, 0),
	(2, 0, 13, 0),
	(2, 0, 14, 0),
	(2, 0, 15, 0),
	(2, 0, 16, 0),
	(2, 0, 17, 0),
	(2, 0, 18, 0),
	(2, 0, 19, 0),
	(2, 0, 20, 0),

	(3, 0, 21, 0),
	(3, 0, 22, 0),
	(3, 0, 23, 0),
	(3, 0, 24, 0),
	(3, 0, 25, 0),
	(3, 0, 26, 0),
	(3, 0, 27, 0),
	(3, 0, 28, 0),
	(3, 0, 29, 0),
	(3, 0, 30, 0),	
	(3, 0, 31, 0),
	(3, 0, 32, 0),
	(3, 0, 33, 0),
	(3, 0, 34, 0),
	(3, 0, 35, 0),				
	(3, 0, 36, 0),
	(3, 0, 37, 0),
	(3, 0, 38, 0),
	(3, 0, 39, 0),
	(3, 0, 40, 0),

	(1, 0, 41, 0),
	(1, 0, 42, 0),
	(1, 0, 43, 0),
	(1, 0, 44, 0),
	(1, 0, 45, 0),
	(1, 0, 46, 0),
	(1, 0, 47, 0),
	(1, 0, 48, 0),
	(1, 0, 49, 0),
	(1, 0, 50, 0),	
	(1, 0, 51, 0),
	(1, 0, 52, 0),
	(1, 0, 53, 0),
	(1, 0, 54, 0),
	(1, 0, 55, 0),				
	(1, 0, 56, 0),
	(1, 0, 57, 0),
	(1, 0, 58, 0),
	(1, 0, 59, 0),
	(1, 0, 60, 0);

INSERT INTO Objects (number_version, snippet,/* id_group, id_author, date_added,*/ count_added, count_views) VALUES
-- (1 - 10)
	(0, 'Линейнoе пространсво над произвольным полем', 1, 2),
	(0, 'База системы векторов', 1, 2),
	(0, 'Pанг системы векторов', 1, 2),
	(0, 'эквивалентные системы векторов ', 1, 2),
	(0, 'базис системы векторов', 1, 2),
	(0, 'Теорема о неполном базисе', 1, 2),
	(0, 'размерность линейного пространства', 1, 2),
	(0, 'изоморфизмом  линейных  пространств', 1, 2),
	(0, 'критерий изоморфизма', 1, 2),
	(0, 'линейное подпространство', 1, 2),
-- (11 - 20)
	(0, 'линейная оболочка', 1, 2),
	(0, 'локальный экстремум', 1, 2),
	(0, 'Необходимое условие экстремума', 1, 2),
	(0, 'Первое достаточное условие экстремума', 1, 2),
	(0, 'Второе достаточное условие экстремума', 1, 2),
	(0, 'Третье достаточное условие экстремума', 1, 2),
	(0, 'Асимптоты', 1, 2),
	(0, 'Критерий наклонной асимптоты', 1, 2),
	(0, 'исследование графика функции', 1, 2),
	(0, 'регистры процессора i386', 1, 2);
--  (21 - 30)

INSERT INTO answer (id_question, number_version_q, id_object, number_version_o) VALUES
-- (1 - 10)
	(41, 0, 1, 0),
	(41, 0, 2, 0),
	(41, 0, 3, 0),
	(41, 0, 4, 0),
	(41, 0, 5, 0),
	(41, 0, 6, 0),
	(41, 0, 7, 0),
	(42, 0, 8, 0),
	(42, 0, 9, 0),
	(42, 0, 10, 0),
-- (11 - 20)
	(42, 0, 11, 0),
	(1, 0, 12, 0),
	(1, 0, 13, 0),
	(1, 0, 14, 0),
	(1, 0, 15, 0),
	(1, 0, 16, 0),
	(3, 0, 17, 0),
	(3, 0, 18, 0),
	(3, 0, 19, 0),
	(21, 0, 20, 0);


INSERT INTO Elements (title, category,  type, key_element, source, clipboard, body, id_author/* id_group, id_author, date_added, */) VALUES
-- 1
	('линейное пространство над произвольным полем', 'определение', 'latex', true, 'Ким, Ильин. Линейная алгебра и аналитическая геометрия', true,
	'Пусть  дано  поле  Р.  Непустое  мн‒во  V называется  линейным или  векторным  
	пространством  над полем  Р,  если  на  этом  мн‒ве  определены  внутренний  V × V →V
	(сложение)  и  внешний  Р  × V →V (умножение  на  число  из  Р)  законы  композиции,  
	удовлетворяющие    аксиомам:  ∀a, b, c ∈ V  и  α, β ∈ P
	1. a + b = b + a
	2. (a + b) + c = a + (b + c)
	3. ∃θ ∈ V: a + θ =   θ + a = a
	4. для  ∀a ∈ V      ∃ − a ∈ V: a + (−a) = (−a) + a = θ
	5. 1 ∙ a = a
	6. α(βa) = (αβ)a
	7. (α + β)a = αa + βa
	8. a(a + b) =   αa + αb', 1),
-- 2 
	('линейное пространство над произвольным полем', 'примеры', 'latex', false,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', true,
	'Линейное    пр‒во  над  полем  R ‒ вещественное  линейное  пр‒во,  над  полем  C ‒
	комплексное.', 1),
-- 3
	('база системы векторов', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', true, 
	'Рассмотрим  конечные  системы  a , ... , a   векторов.  Линейно  
	независимая  подсистема  системы  векторов,  через  которую  линейно  выражается  ∀
	вектор  системы,  называется  базой этой системы  векторов', 1);

INSERT INTO Elements (title, category,  type, key_element, source, clipboard, body/* id_group, id_author, date_added, */) VALUES
-- 4	
	('база системы векторов', 'свойства', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false,
	'С1. Все  базы  одной  системы  векторов  состоят  из  одинакового  числа  векторов,  
	равного  максимальному  числу  линейно  независимых  векторов  системы.'),
-- 5
	('ранг системы векторов', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Число  векторов  базы  называется  рангом  системы  векторов: rg (а 1 ,...,а n ) =
	максимальному  числу  линейно  независимых  векторов  системы. '),
-- 6
	('эквивалентные системы векторов', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false,
	 'системы  векторов  линейного  пр‒ва  называются  эквивалентными, если  каждая  из  
	этих  систем  выражается  через  другую'),
-- 7
	('эквивалентные системы векторов', 'следствия', 'latex', false,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'С1. база  системы  векторов  эквивалентна самой  системе. С2. Ранги  эквивалентных  систем  совпадают.
	С3. Эквивалентные  линейно  независимые  системы  векторов  состоят  из  
	одинакового  числа  векторов.'),
-- 8	
	('базис системы векторов', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false,
	 'Система  векторов е 1 ,...,  е п линейного  пр‒ва  V порож‒дает  пр‒во V, если  ∀ х  ∈ V
	является  линейной  комби‒нацией  е 1 ,...,  е п . Упорядоченная  система  векторов  е 1 ,...,е п
	линейного  пр‒ва  V называется  базисом V, если  она  линейно  независима  и  порождает  
	V.'),
-- 9	
	('Теорема о неполном базисе', 'формулировка', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Т2  (о  неполном  базисе).  В  п‒мерном  пр‒ве  ∀ линейно  независимую  систему  из  k,  где  
	k < n, векторов  можно  дополнить  до  базиса.'),
-- 10	
	('Теорема о неполном базисе', 'доказательство', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Док‒во. е 1 ...,  е п ‒  линейно  независимая  система  векторов  пр‒ва  V. Т.к.  k <  п  => система  е 1 ,  ...,  е k не  является  базисом  V => не  порождает  всего  пр‒ва  V.
	Пусть  вектор  е k+1 ∈ V не  является  линейной  комбинацией  е 1 ,  ...,  е k =>  система век-
	торов  е 1 ,...,е k , е k+1 линейно  независима.  Если  k+1=  п  ,  то  эта  система  
	векторов  образует  базис  V, если  же  k+1 < п,  то  ан‒но  построим  линейно  
	независимую  систему  из
	k +  2  векторов.  За  n ‒  k таких  шагов  мы  построим  искомый  базис  е 1 ...,е k ,...,е n .'),
-- 11	
	('размерность линейного пространства', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false,
	'Число  векторов  базиса  линейного  пр‒ва  V ‒ размерность    пространства
	V : dim V.'),
-- 12	
	('размерность линейного пространства', 'примеры', 'latex', false,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Линейное  пр‒во  размерности  п, п  ∈ N,
	называется  п‒мерным.  0‒е  пространство  и  n‒мерные  пр‒ва  называются  
	конечномерными. Линейное  пр‒во  называется  бесконечномерным, если  
	для  ∀k ∈ N в  пр‒ве  Ǝ  k линейно  независимых  векторов.  Пример:  пр‒во  М ∞
	многочленов  всех  степеней.'),
-- 13	
	('изоморфизмом  линейных  пространств', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	' линейных  пр‒ва  V 1 и  V 2 над  общим  полем  Р  называются  изоморфными
	(V I    ≅ V 2 ), если  Ǝ  биективное  отображение  φ: V 1 → V 2 , которое  сохраняет  
	законы  композиции,  т.е.  если  для  ∀  х,  у  ∈ V 1 и  ∀ числа  α ∈ P
	1) φ(x + y) = φ(x) + φ(y)
	2) φ(αx)    =   αφ(x).
	Само  отображение  φ называется  изоморфизмом  линейных  пространств.'),
-- 14	
	('критерий изоморфизма', 'доказательство', 'latex', false,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Док‒во.  Необх‒сть =>  из  св‒ва  "г"  изоморфных  пр‒тв.
	Дост‒сть. Пусть  V 1 и  V 2 ‒  линейные  пр‒ва  над  полем  Р  и  dim V 1 = dim V 2
	=  п.  Пусть  е 1 , ...,е n ‒ базис  V I ,
	f 1 ,...,  f n ‒ базис  V 2 . Построим  отображение  φ: V 1 → V 2 , : ∀ х  =  ∑ α e ∈
	V 1 →  у  =  ∑ α f ∈ V 2 (т.е.  вектор  y имеет  те  же  координаты,  что  и  х). Из  
	единственности  разложения  вектора  по  базису  =>  отображение  φ
	биективно.  И    φ ‒ изоморфизм,  т.к.  координаты  вектора  обладают  св‒вом  
	линейности.  '),
-- 15	
	('критерий изоморфизма', 'формулировка', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	' 2  линейных  пр‒ва  над  общим  полем  
		изоморфны  тогда и только тогда, когда их  размерности  равны.'),
-- 16	
	('линейное подпространство', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Подмножество  L линейного  пр‒ва  V над  полем  Р  называется  линейным  
	подпространством пр‒ва V ,  если  оно  является  линейным  пр‒вом  
	относительно  законов  композиции  в  V .'),
-- 17	
	('линейная оболочка', 'определение', 'latex', true,'Ким, Ильин. Линейная алгебра и аналитическая геометрия', false, 
	'Пусть  a 1 , ..., a k ‒  система  векторов  линейного  пр‒ва  V над  полем  Р.  Линейной  
оболочкой L (a 1 , ..., a k ) системы  векторов  a 1 , ..., a k называется  мн‒во  
всевозможных  линейных  комбинаций  этих  векторов:   L (a 1 , ..., a k ) ={ a
=  ∑ α a |α    ∈ P, i = 1, k }'),
-- 18	
	('локальный максимум(минимум)', 'определение', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Пусть f (х) определена всюду в некоторой окрестности точки с.
	f(х) имеет в точке c локальный максимум (минимум), если Ǝ такая
	окрестность точки с, в пределах которой f (с) является наибольшим
	(наименьшим) среди всех других значений функции.'),
-- 19	
	('необходимое условие экстремума', 'теорема', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'если f (х) дифференцируема в
	точке с и имеет в этой точке экстремум, то  f ''(с) = 0.'),
-- 20	
	('Первое достаточное условие экстремума', 'теорема', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Пусть с ‒ точка возможного экстремума f (х), и пусть
	f (х) дифференцируема всюду в некоторой окрестности точки с.
	Тогда, если в пределах этой окрестности f '' (x) > 0 (< 0) слева от
	точки с и f '' (x) < 0 (> 0) справа от с, то f (х) имеет в точке с
	локальный максимум (минимум). Если f '' (x) имеет один и тот же
	знак слева и справа от с, то экстремума в точке с нет.'),
-- 21	
	('Первое достаточное условие экстремума', 'доказательство', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Док‒во. 1) Пусть в пределах рассматриваемой окрестности f '' (x) >0 (f
	'' (x) < 0) слева от с и f '' (x) < 0 ( f '' (x) > 0) справа от с. Пусть х 0 ‒
	∀ значение аргумента из этой окрестности: х 0 ≠с. f (х) диф‒ма (=>
	непрерывна) на [с, х 0 ]. Применяя к f (х) по [с, х 0 ] Т. Лагранжа:
	f (с) ‒ f (х 0 )= f ''(ξ)(с ‒ х 0 ) (1)
	где с < ξ < х 0 . Т.к. f '' (ξ)>0 (<0) при х 0 < с и f '' (ξ)<0 ( > 0 при
	х 0 >с), правая часть (1) >0 (<0) => левая тоже => значение f (с) ‒
	наибольшее (наименьшее) среди всех значений f (х) в окрестности.
	2) Если f '' (x) имеет один и тот же знак слева и справа от с, то правая
	часть (1) имеет разные знаки при x 0 < с и при х 0 > с => отсутствие
	экстремума в точке с.'),
-- 22	
	('Второе достаточное условие экстремума', 'формулировка', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Пусть f (х) имеет в данной точке с возможного
	экстремума конечную 2‒ую производную. Тогда f (х) имеет в точке с
	максимум, если f (2) (c) < 0, и минимум, если f (2) (c) > 0.'),
-- 23	
	('Второе достаточное условие экстремума', 'доказательство', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Док‒во. Из f (2) (c) < 0 (f (2) (c) > 0) и Т2° => f '' (x) убывает
	(возрастает) в точке с. По условию f '' (c) = 0 => Ǝ такая окрестность
	точки с, в пределах которой f '' (x) >0 (<0) слева от с и f ''(x) <0 (>0)
	справа от с => по Т1 f (х) имеет в точке с максимум (минимум).'),
-- 24	
	('Третье достаточное условие экстремума', 'формулировка', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Пусть п ≥ 1‒ целое число и пусть функция у = f (x)
	имеет производную порядка п в некоторой окрестности точки с и
	производную порядка п+1 в самой точке с. Пусть справедливы: f
	(1)
	(c) = f (2) (c) = ...= f (n) (c) = 0, f (n+1) (c) ≠ 0 (2)
	Если п ‒ нечетное, то у = f (х) имеет локальный экстремум в
	точке с: локальный минимум при f (n+1) (c) > 0 и локальный максимум
	при f (n+1) (c) < 0.'),
-- 25	
	('Третье достаточное условие экстремума', 'доказательство', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Док‒во. При п = 1 это Т2.
	Пусть п ≥ 3 и f (n+1) (c) > 0 (для f (n+1) (c) < 0 ан‒но) => по Т2,
	примененной к f (n) (x), функция f (n) (x) возрастает в точке с.
	Поскольку f (n) (с) = 0 => найдется достаточно малая окрестность
	точки с, в пределах которой f (n) (x) < 0 слева от с и f (n) (x) > 0
	справа от с. Разложим f '' (x) в окрестности точки с по формуле
	Тейлора с остаточным членом в форме Лагранжа => для ∀ х из
	достаточно малой окрестности точки с между с и х Ǝ ξ :
	f (2) (c)
	(x − c) + ⋯
	f ′ (x) = f ′ (c) +
	1!
	(n−1) (c)
	(n) (ξ)
	f
	f
	(x − c) n−2 +
	(x − c) n−1
	+
	(n − 2)!
	(n − 1)!
	Из (2) и доп. условия f ''(с) = 0 =>
	f (n) (ξ)
	(x − c) n−1
	f ′ (x) =
	(3)
	(n − 1)!
	ξ лежит между с и х => для всех х из малой окрестности точки с:
	f (n) (c) < 0 при х < с и f (n) (c) > 0 при х> с. При нечетном п число n
	‒ 1 ‒ четное => вся правая (и левая) часть (3) для всех х из малой
	окрестности с отрицательна слева от с и положительна справа от с.
	По Т1 f (x) имеет локальный минимум в точке с.'),
-- 26	
	('вертикальная асимптота', 'определение', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Прямая х = а является вертикальной асимптотой графика
	функции у = f (х), если хотя бы одно из предельных значений
	lim x→a+0 f(x) или lim x→a−0 f(x) равно +∞ или ‒∞.'),
-- 27	
	('наклонная асимптота', 'определение', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Прямая Y = kх + b является наклонной асимптотой графика
	функции у = f (х) при х→+∞, если f (х) представима в виде f (х) = kx
	+ b + α(х), где lim x→+∞ α(x) = 0.'),
-- 28	
	('критерий наклонной асимптоты', 'формулировка', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Т1. Для того чтобы график функции у = f (х) имел при х→+∞
	наклонную асимптоту Y = kх + b необходимо и достаточно, чтобы
	Ǝ два предельных значения f(x)
	lim = k и lim [f(x) − kx] = b'),
-- 29	
	('критерий наклонной асимптоты', 'доказательство', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'Док‒во. 1) Необходимость. Пусть график функции
	у = f (х) имеет при х→+∞ асимптоту Y = kх + b,
	т. е. f (х) = kx+b+α(х) =>
	kx + b + α(x)
	f(x)
	= k
	lim
	= lim
	x
	x→+∞ x
	x→+∞
	lim [f(x) − kx] = lim [b + α(x)] = b
	x→+∞
	x→+∞
	2) Достаточность. Пусть Ǝ предельные значения (1). Из 2‒го =>
	разность f (х) ‒ kх ‒ b является бесконечно малой при х→+∞.
	Обозначив эту бесконечно малую α(х), получим для f (х)
	представление
	f (х) = kx + b +α (x).
	Замечание. Для х→‒∞ все аналогично.'),
-- 30	
	('исследование графика функции', 'схема', 'latex', true,'Ильин. Садовничий. Математический анализ', false, 
	'1°. Уточнить область задания функции.
	2°. Выяснить вопрос о существовании асимптот (вертикальных и
	наклонных).
	3°. Найти области возрастания и убывания функции и точки
	экстремума.
	4°. Найти области сохранения направления выпуклости и точки
	перегиба.
	5°. Найти точки пересечения графика функции с осью Ох.'),
-- 31	
	('регистр процессора', 'определение', 'latex', true, 'википедия', false, 
	'Регистр процессора — блок ячеек памяти, образующий сверхбыструю оперативную память (СОЗУ) 
	внутри процессора; используется самим процессором и большей частью недоступен программисту: например, при выборке из памяти очередной команды 
	она помещается в регистр команд, к которому программист обратиться не может. '),
-- 32	 
	('специальные регистры', '', 'latex', true, 'А.В.Столяров. Низкоуровневое программирование', false, 
	'Специальные регистры предназначены для координации информационного
	взаимодействия основных компонентов процессора. В их состав могут входить
	специальные регистры, обеспечивающие управление устройствами компьютера, регистры,
	содержимое которых используется для представления информации об актуальном
	состоянии выполняемой процессором программы и т.д. Так же, как и в случае регистров
	общего назначения, состав специальных регистров определяется архитектурой конкретного
	процессора. К наиболее распространенным специальным регистрам относятся: счетчик
	команд (program counter), указатель стека (stack pointer), слово состояния процессора
	(processor status word). Счетчик команд — специальный регистр, в котором размещается
	адрес очередной выполняемой команды программы. Счетчик команд изменяется в
	устройстве управления согласно алгоритму, заложенному в программу. Более подробно
	использование счетчика команд проиллюстрируем несколько позднее при рассмотрении
	рабочего цикла процессора. Указатель стека — регистр, содержимое которого в каждый
	момент времени указывает на адрес слова в области памяти, являющегося вершиной стека.'),
-- 33	
	('регистры общего назначения', '', 'latex', true, 'А.В.Столяров. Низкоуровневое программирование', false, 
	'Регистры общего назначения (РОН) состоят из доступных для программ
	пользователей регистров, предназначенных для хранения операндов, адресов операндов,
	результатов выполнения команд. РОН могут иметь машинную типизацию (например,
	регистры для хранения данных с плавающей точкой, с фиксированной точкой и т.д.). РОН
	могут быть скалярными (когда с одним регистром ассоциируется только одна единица
	памяти) и векторными (например, с одним регистром может ассоциироваться вектор
	регистров из 64 элементов; примером классических векторных компьютеров являются
	компьютеры фирмы CRAY). Для чего нужны РОН? Регистровая память работает в темпе
	процессора, т.е. скорость доступа к содержимому регистров сравнима со скоростью
	обработки информации процессором, поэтому одной из основных причин появления
	регистров общего назначения было сглаживание дисбаланса в производительности
	процессора и скорости доступа к оперативной памяти. РОН были первым аппаратным
	средством, которое предоставлялось пользователю для оптимизации своей программы.
	Наиболее часто используемые в программе операнды размещались на регистрах общего
	назначения, тем самым происходило сокращение количества реальных обращений в
	оперативную память, что, в итоге, повышало суммарную производительность компьютера.
	Состав регистров общего назначения существенно зависит от архитектуры конкретного
	компьютера.');

INSERT INTO body_object (id_object, number_version, id_element) VALUES
	(1, 0, 1),
	(1, 0, 2),
	(2, 0, 3),
	(2, 0, 4),
	(3, 0, 5),
	(4, 0, 6),
	(4, 0, 7),
	(5, 0, 8),
	(6, 0, 9),
	(6, 0, 10),
	(7, 0, 11),
	(6, 0, 9),
	(6, 0, 10),
	(7, 0, 11),
	(7, 0, 12),
	(8, 0, 13),
	(9, 0, 14),
	(9, 0, 15),
	(10, 0, 16),
	(11, 0, 17),
	(12, 0, 18),
	(13, 0, 19),
	(14, 0, 20),
	(14, 0, 21),
	(15, 0, 22),

	(15, 0, 23),
	(16, 0, 24),
	(16, 0, 25),
	(17, 0, 26),
	(17, 0, 27),
	(18, 0, 28),
	(18, 0, 29),
	(19, 0, 30),
	(21, 0, 31),
	(21, 0, 32),
	(21, 0, 33);

COMMIT;