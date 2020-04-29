SET datestyle = "ISO, DMY";

BEGIN;

INSERT INTO Users (login, hs256_sha256, email) VALUES
	('user', '1815e513d9176266ea9719b2c3722fe7c2b92c35295b4236292caa329dae6c84', 'user@mail.ru'),
	('prodolban', '3245e513d9176266ea9719b2c3722fe7c2b92c35295b4236292caa329dae6c89', 'prodolban@mail.ru');

INSERT INTO Groups (name, creator_id, created) VALUES
	('me and my friend prodolban', 1, '20/04/2020 19:30:07');

INSERT INTO Books (title, user_id, content) VALUES
	('А.В.Столяров. Низкоуровневое программирование', 1, decode('JVBERi0xLgoxIDAgb2JqPDwvUGFnZXMgMiAwIFI+PmVuZG9iagoyIDAgb2JqPDwvS2lkc1szIDAgUl0vQ291bnQgMT4+ZW5kb2JqCjMgMCBvYmo8PC9QYXJlbnQgMiAwIFI+PmVuZG9iagp0cmFpbGVyIDw8L1Jvb3QgMSAwIFI+Pg==', 'base64')),
	('Ким, Ильин. Линейная алгебра и аналитическая геометрия', 1, decode('JVBERi0xLgoxIDAgb2JqPDwvUGFnZXMgMiAwIFI+PmVuZG9iagoyIDAgb2JqPDwvS2lkc1szIDAgUl0vQ291bnQgMT4+ZW5kb2JqCjMgMCBvYmo8PC9QYXJlbnQgMiAwIFI+PmVuZG9iagp0cmFpbGVyIDw8L1Jvb3QgMSAwIFI+Pg==', 'base64')),
	('Ильин. Садовничий. Математический анализ', 1, decode('JVBERi0xLgoxIDAgb2JqPDwvUGFnZXMgMiAwIFI+PmVuZG9iagoyIDAgb2JqPDwvS2lkc1szIDAgUl0vQ291bnQgMT4+ZW5kb2JqCjMgMCBvYmo8PC9QYXJlbnQgMiAwIFI+PmVuZG9iagp0cmFpbGVyIDw8L1Jvb3QgMSAwIFI+Pg==', 'base64'));

INSERT INTO Exams (group_id, author_id, title, teacher, created) VALUES
	(1, 1, 'Линейная алгебра и аналитическая геометрия', 'Ким Галина Динховна', '20/04/2020 21:03:57'),
	(1, 1, 'Математический анализ', 'Фомичёв Василий Владимирович', '20/05/2020 20:37:01'),
	(1, 1, 'Архитектура ЭВМ и язык ассемблера', 'Столяров Андрей Викторович', '27/05/2020 17:56:31');

INSERT INTO Questions (text, group_id, author_id, created) VALUES
--	(1 - 20)
	('Отыскание точек локального экстремума функции. Достаточные условия экстремума', 1, 1, '20/05/2020 21:31:57'),
	('Направление выпуклости графика функции и точки перегиба. Достаточные условия перегиба.', 1, 1, '20/05/2020 21:32:57'),
	('Асимптоты графика функции. Общая схема исследования графиков функций', 1, 1, '20/05/2020 21:33:57'),
	('Понятие интегрируемости функции. Леммы Дарбу о верхних и нижних суммах', 1, 1, '20/05/2020 21:34:57'),
	('Необходимое и достаточное условие интегрируемости', 1, 1, '20/05/2020 21:35:57'),
	('Классы интегрируемых функций', 1, 1, '20/05/2020 21:31:57'),
	('Основные свойства определенного интеграла. Оценки интегралов. Формулы среднего значения', 1, 1, '20/05/2020 21:36:57'),
	('Основная формула интегрального исчисления. Формулы замены переменного и интегрирования по частям', 1, 1, '20/05/2020 21:37:57'),
	('Понятие длины плоской кривой. Формулы для вычисления длины дуги кривой', 1, 1, '20/05/2020 21:31:57'),
	('Понятие квадрируемости (площади) плоской фигуры. Площадь криволинейной трапеции и криволинейного сектора', 1, 1, '20/05/2020 21:38:57'),
	('Объем тела', 1, 1, '20/05/2020 21:31:57'),
	('Абсолютная сходимость несобственных интегралов. Формулы замены переменного и интегрирования по частям для несобственных интегралов', 1, 1, '20/05/2020 21:39:57'),
	('Метод хорд и его обоснованиеПризнак Абеля-Дирихле. Главное значение несобственного интеграла', 1, 1, '20/05/2020 21:40:57'),
	('Метод касательных и его обоснование', 1, 1, '20/05/2020 21:31:57'),
	('Приближенные методы вычисления определенных интегралов ( для одного из методов вывести оценку погрешности )', 1, 1, '20/05/2020 21:41:57'),
	('Различные множества точек и последовательности точек N-мерного пространства. Теорема Больцано-Вейерштрасса', 1, 1, '20/05/2020 21:42:57'),
	('Понятие функции N-переменных и ее предельного значения', 1, 1, '20/05/2020 21:43:57'),
	('Непрерывность функции N-переменных. Основные теоремы о непрерывных функциях', 1, 1, '20/05/2020 21:44:57'),
	('Понятие дифференцируемости функции. Достаточное условие дифференцируемости. Касательная плоскость к поверхности', 1, 1, '20/05/2020 21:45:57'),
	('Дифференцирование сложной функции нескольких переменных. Инвариантность формы 1‒го дифференциала.', 1, 1, '20/05/2020 21:45:57'),
--  (21 - 40)
	('Система регистров процессора i386', 1, 1, '28/05/2020 21:42:57'),
	('Команды процессора i386: операнды, типы операндов, разрядность операндов', 1, 1, '29/05/2020 21:43:57'),
	('команда MOV и её пять основных форм в зависимости от типов операндов', 1, 1, '28/05/2020 21:44:57'),
	('Прямая и косвенная адресация памяти в процессоре i386; общий вид исполнительного адреса, команда LEA', 1, 1, '29/05/2020 21:45:57'),
	('сложение, вычитание и сравнение целых чисел; влияние этих операций на регистр флагов', 1, 1, '29/05/2020 21:42:57'),
	('операции увеличения и уменьшения на единицу, операция смены знака, влияние этих операций на регистр флагов', 1, 1, '29/05/2020 21:56:57'),
	('умножение целых чисел (знаковых и беззнаковых); влияние операций умножения на регистр флагов', 1, 1, '28/05/2020 21:57:57'),
	('деление целых чисел (знаковых и беззнаковых); исключительные ситуации, связанные с делением', 1, 1, '29/05/2020 21:59:57'),
	('операции знакового и беззнакового расширения разрядности', 1, 1, '30/05/2020 21:42:57'),
	('побитовые логические операции', 1, 1, '20/05/2020 21:43:57'),
	('операции простого и арифметического побитового сдвига', 1, 1, '31/05/2020 21:44:57'),
	('классификация команд передачи управления в зависимости от <<дальности>>', 1, 1, '29/05/2020 21:45:57'),
	('прямая и косвенная адресация в командах передачи управления, использование абсолютной и относительной адресации', 1, 1, '28/05/2020 21:45:57'),
	('команда безусловного перехода и её возможные формы', 1, 1, '29/05/2020 21:42:57'),
	('команды условных переходов в зависимости от значения отдельных флагов', 1, 1, '30/05/2020 21:43:57'),
	('команды условных переходов в зависимости от результата операции над знаковыми числами', 1, 1, '23/05/2020 21:44:57'),
	('команды условных переходов в зависимости от результата операции над беззнаковыми числами', 1, 1, '28/05/2020 21:45:57'),
	('Организация ветвления (оператора if-else) с помощью команд условных и безусловных переходов', 1, 1, '29/05/2020 21:45:57'),
	('Организация циклов с предусловием и постусловием с помощью команд условных и безусловных переходов', 1, 1, '30/05/2020 21:42:57'),
	('команды LOOP и JECXZ, LOOPE/LOOPZ, LOOPNE/LOOPNZ; организация арифметических циклов', 1, 1, '31/05/2020 21:43:57'),
--  (41 - 60)
	('Линейное пространство над произвольным полем. Ранг и база системы векторов.', 1, 1, '27/05/2020 21:43:57'),
	('Изоморфизм линейных пространств', 1, 1, '23/05/2020 21:44:57'),
	('Сумма и пересечение линейных пространств.', 1, 1, '28/05/2020 21:45:57'),
	('Прямая сумма линейных пространств.', 1, 1, '29/05/2020 21:45:57'),
	('Евклидово и унитарное пространство. Неравенство Коши‒Буняковского‒Шварца.', 1, 1, '30/05/2020 21:42:57'),
	('Скалярное произведение в ортонормированном базисе. Существование ОНБ.', 1, 1, '31/05/2020 21:43:57'),
	('Изометрия.', 1, 1, '30/05/2020 21:43:57'),
	('Матрица Грама. Критерий линейной зависимости.', 1, 1, '23/05/2020 21:44:57'),
	('Ортогональное дополнение. Ортогональная сумма подпространств. Расстояние от вектора до подпространства.', 1, 1, '28/05/2020 21:45:57'),
	('Ортонормированный базис и унитарные (ортогональные) матрицы.', 1, 1, '29/05/2020 21:45:57'),
	('Процесс ортогонализации Грама‒Шмидта. QR‒разложение матрицы.', 1, 1, '30/05/2020 21:42:57'),
	('Линейное афинное  многообразие в линейном пр‒ве. Гиперплоскость.', 1, 1, '31/05/2020 21:43:57'),
	('Линейные операторы (ЛО). Матрица ЛО.', 1, 1, '30/05/2020 21:43:57'),
	('Матрица ЛО при переходе к другому базису. Эквивалентность и подобие матриц.', 1, 1, '23/05/2020 21:44:57'),
	('Линейное пр‒во ЛО и матриц.', 1, 1, '28/05/2020 21:45:57'),
	('Произведение ЛО и его матрица.', 1, 1, '29/05/2020 21:45:57'),
	('Ядро и образ ЛО. Каноническая пара базисов.', 1, 1, '30/05/2020 21:42:57'),
	('Линейные функционалы. Сопряженное пр‒во. Линейные функционалы и гиперплоскости.', 1, 1, '31/05/2020 21:43:57'),
	('Обратный оператор и критерий обратимости.', 1, 1, '30/05/2020 21:43:57'),
	('Собственные значения и векторы. Операторы простой структуры и диагонализуемые матрицы.', 1, 1, '23/05/2020 21:44:57');


INSERT INTO ExamQuestions (exam_id, position, question_id) VALUES
	(2, 1, 1),
	(2, 2, 2),
	(2, 3, 3),
	(2, 4, 4),
	(2, 5, 5),
	(2, 6, 6),
	(2, 7, 7),
	(2, 8, 8),
	(2, 9, 9),
	(2, 10, 10),
	(2, 11, 11),
	(2, 12, 12),
	(2, 13, 13),
	(2, 14, 14),
	(2, 15, 15),
	(2, 16, 16),
	(2, 17, 17),
	(2, 18, 18),
	(2, 19, 19),
	(2, 20, 20),

	(3, 1, 21),
	(3, 2, 22),
	(3, 3, 23),
	(3, 4, 24),
	(3, 5, 25),
	(3, 6, 26),
	(3, 7, 27),
	(3, 8, 28),
	(3, 9, 29),
	(3, 10, 30),
	(3, 11, 31),
	(3, 12, 32),
	(3, 13, 33),
	(3, 14, 34),
	(3, 15, 35),
	(3, 16, 36),
	(3, 17, 37),
	(3, 18, 38),
	(3, 19, 39),
	(3, 20, 40),

	(1, 1, 41),
	(1, 2, 42),
	(1, 3, 43),
	(1, 4, 44),
	(1, 5, 45),
	(1, 6, 46),
	(1, 7, 47),
	(1, 8, 48),
	(1, 9, 49),
	(1, 10, 50),
	(1, 11, 51),
	(1, 12, 52),
	(1, 13, 53),
	(1, 14, 54),
	(1, 15, 55),
	(1, 16, 56),
	(1, 17, 57),
	(1, 18, 58),
	(1, 19, 59),
	(1, 20, 60);

INSERT INTO Materials (title,/* group_id, created*, forks_from*/ views_count, author_id, clipboard) VALUES
-- (1 - 10)
	('Линейнoе пространсво над произвольным полем', 2, 1, true),
	('База системы векторов', 2, 1, true),
	('Pанг системы векторов', 2, 1, true),
	('эквивалентные системы векторов ', 2, 1, true),
	('базис системы векторов', 2, 1, true),
	('Теорема о неполном базисе', 2, 1, true),
	('размерность линейного пространства', 2, 1, true),
	('изоморфизмом  линейных  пространств', 2, 1, false),
	('критерий изоморфизма', 2, 1, false),
	('линейное подпространство', 2, 1, false),
-- (11 - 20)
	('линейная оболочка', 2, 1, false),
	('локальный экстремум', 2, 1, false),
	('Необходимое условие экстремума', 2, 1, false),
	('Первое достаточное условие экстремума', 2, 1, false),
	('Второе достаточное условие экстремума', 2, 1, false),
	('Третье достаточное условие экстремума', 2, 1, false),
	('Асимптоты', 2, 1, false),
	('Критерий наклонной асимптоты', 2, 1, false),
	('исследование графика функции', 2, 1, false),
	('регистры процессора i386', 2, 1, false);
--  (21 - 30)

INSERT INTO QuestionMaterials (question_id, position, material_id) VALUES
-- (1 - 10)
	(41, 1, 1),
	(41, 2, 2),
	(41, 3, 3),
	(41, 4, 4),
	(41, 5, 5),
	(41, 6, 6),
	(41, 7, 7),
	(42, 1, 8),
	(42, 2, 9),
	(42, 3, 10),
-- (11 - 20)
	(42, 4, 11),
	(1, 1, 12),
	(1, 2, 13),
	(1, 3, 14),
	(1, 4, 15),
	(1, 5, 16),
	(3, 1, 17),
	(3, 2, 18),
	(3, 3, 19),
	(21, 1, 20);


INSERT INTO BaseElements (title, category,  type, is_pivotal, source, clipboard, body, author_id/* id_group, created*/) VALUES
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
	вектор  системы,  называется  базой этой системы  векторов', 1),
-- 4
	('Демонстрация возможностей базовых элементов с типом LaTeX', 'примеры', 'latex', true,'https://latex.js.org/playground.html', true, '

\\documentclass{article}

\\usepackage{comment, multicol}
\\usepackage{hyperref}

\\usepackage{calc,pict2e,picture}
\\usepackage{textgreek,textcomp,gensymb,stix}

\\setcounter{secnumdepth}{2}

\\title{\\LaTeX.js Showcase}
\\author{made with $\\varheartsuit$ by Michael Brade}
\\date{2017--2020}


\\begin{document}

\\maketitle


\\begin{abstract}
This document will show most of the features of \\LaTeX.js while at the same time being a gentle introduction to \\LaTeX.
In the appendix, the API as well as the format of custom macro definitions in JavaScript will be explained.
\\end{abstract}


\\section{Characters}

It is possible to input any UTF-8 character either directly or by character code
using one of the following:

\\begin{itemize}
\\item \\texttt{\\textbackslash symbol\\{"00A9\\}}: \\symbol{"00A9}
\\item \\verb|\\char"A9|: \\char"A9
\\item \\verb|^^A9 or ^^^^00A9|: ^^A9 or ^^^^00A9
\\end{itemize}

\\bigskip

\\noindent
Special characters, like those:
\\begin{center}
\\$ \\& \\% \\# \\_ \\{ \\} \\~{} \\^{} \\textbackslash % \\< \\>  \\"   % TODO cannot be typeset
\\end{center}
%
have to be escaped.

More than 200 symbols are accessible through macros. For instance: 30\\,\\textcelsius{} is
86\\,\\textdegree{}F. See also Section~\\ref{sec:symbols}.



\\section{Spaces and Comments}

Spaces and comments, of course, work just as they do in \\LaTeX.
This is an            % stupid
% Better: instructive <----
example: Supercal%
          ifragilist%
icexpialidocious

It does not matter whether you enter one or several     spaces after a word, it
will always be typeset as one space---unless you force several spaces, like\\ \\ now.

New \\TeX users may miss whitespaces after a command. % renders wrong
Experienced \\TeX{} users are \\TeX perts, and know how to use whitespaces. % renders correct

Longer comments can be embedded in the \\texttt{comment} environment:
This is another  \\begin  {comment}
rather stupid,
but helpful
\\end
{comment}
example for embedding comments in your document.



\\section{Dashes and Hyphens}

\\LaTeX\\ knows four kinds of dashes. Access three of them with different numbers
of consecutive dashes. The fourth sign is actually not a dash at all---it is the
mathematical minus sign:

\\begin{quote}
  daughter-in-law, X-rated\\\\
  pages 13--67\\\\
  yes---or no? \\\\
  $0$, $1$ and $-1$
\\end{quote}
%
The names for these dashes are: ‘-’ hyphen, ‘--’ en-dash, ‘---’ em-dash,
and ‘$-$’ minus sign. \\LaTeX.js outputs the actual true unicode character for those
instead of using the hypen-minus.



\\section{Text and Paragraphs, Ligatures}

An empty line starts a new paragraph, and so does \\verb|\\par|.
\\par Like this. A new line usually starts automatically when the previous one is
full. However, using \\verb+\\newline+ or \\verb|\\\\|,\\newline one can force \\\\ to start a new line.

Ligatures are supported as well, for instance:

\\begin{center}
fi, fl, ff, ffi, ffl \\dots{} instead of f\\/i, f\\/l, f\\/f\\/l \\dots
\\end{center}

Use \\texttt{\\textbackslash\\slash} to prevent a ligature.



\\begin{multicols}{2}[\\subsection{Multicolumns}]

The multi-column layout, using the \\texttt{multicols} environment, allows easy
definition of multiple columns of text---just like in newspapers. The first
and mandatoriy argument specifies the number of columns the text should be divided into.

It is often convenient to spread some text over all columns, just before the multicolumn
output. In \\LaTeX, this was needed to prevent any page break in between. To achieve this,
the \\texttt{multicols} environment has an optional second argument which can be used for
this purpose.

For instance, this text you are reading now was started with the argument
\\texttt{\\textbackslash subsection\\{Multicolumns\\}}.

\\end{multicols}



\\section{Boxes}

\\LaTeX.js supports most of the standard \\LaTeX\\ boxes.

\\medbreak

\\noindent\\fbox{\\verb|\\mbox{|\\emph{text}\\verb|}|}

\\smallbreak

We already know one of them: it''s called \\verb|\\mbox|. It simply packs up a series of boxes into another one, and
can be used to prevent \\LaTeX.js from breaking two words. As boxes can be put inside boxes, these horizontal box
packers give you ultimate flexibility.

\\bigbreak

% yes, unlike in LaTeX, you may put \\verb|| anywhere, here it is inside an \\fbox :)
\\noindent\\fbox{
\\verb|\\makebox[|\\emph{width}\\verb|][|\\emph{pos}\\verb|]{|\\emph{text}\\verb|}|
}

\\noindent\\fbox{
\\verb|\\framebox[|\\emph{width}\\verb|][|\\emph{pos}\\verb|]{|\\emph{text}\\verb|}|
}

\\smallbreak

\\noindent
\\emph{width} defines the width of the resulting box as seen from the outside.
The \\emph{pos} parameter takes a one letter value: \\textbf{c}enter,
flush\\textbf{l}eft, or flush\\textbf{r}ight. \\textbf{s}pread is not really working
in HTML.


The command \\verb|framebox| works exactly the same as \\verb|makebox|, but it
draws a box around the text.

The following example shows you some things you could do with
the \\verb|makebox| and \\verb|framebox| commands.

\\begin{quote}
  \\fbox{\\makebox[10cm][c]{\\textbf{c} e \\textbf{n} t r a l}}\\par

  \\framebox{Guess I''m framed now!} \\par
  \\framebox[2cm][r]{Bummer, I am too wide} \\par
  \\framebox[1cm][l]{never mind, so am I}
  Can you read this?
\\end{quote}


\\bigbreak

\\noindent\\fbox{
\\verb|\\parbox[|\\emph{pos}\\verb|][|\\emph{height}\\verb|][|\\emph{inner-pos}\\verb|]{|\\emph{width}\\verb|}{|\\emph{text}\\verb|}|
}

\\smallbreak

\\noindent
The \\verb|\\parbox| command produces a box the contents of which are created in paragraph mode. However, only small
pieces of text should be used, paragraph-making environments shouldn''t be used inside a \\verb|\\parbox| argument. For
larger pieces of text, including ones containing a paragraph-making environment, you should use a \\verb|minipage|
environment.

By default LaTeX will position vertically a parbox so its center lines up with the center of the surrounding text line.
When the optional position argument is present and equal either to ‘\\verb|t|’ or ‘\\verb|b|’, this allows you respectively
to align either the top or bottom line in the parbox with the baseline of the surrounding text. You may also specify
‘\\verb|m|’ for position to get the default behaviour.

The optional \\emph{height} argument overrides the natural height of the box.

The \\emph{inner-pos} argument controls the placement of the text inside the box, as follows; if it is not specified, \\emph{pos} is used.

\\verb|t| text is placed at the top of the box.

\\verb|c| text is centered in the box.

\\verb|b| text is placed at the bottom of the box.

\\verb|s| is not supported in HTML

\\smallbreak\\noindent
The following examples demonstrate simple positioning:

\\begin{itemize}
\\item simple alignment:

Some text
\\fbox{\\parbox{2cm}{parbox default alignment, parbox test text}}
some text
\\fbox{\\parbox[t]{2cm}{parbox top alignment, text parbox test text}}
some text
\\fbox{\\parbox[b]{2cm}{parbox bottom alignment, text parbox test text}}
some text.


\\item alignment with a given height:

Some text
\\fbox{\\parbox[c][3cm]{2cm}{parbox default alignment, parbox test text}}
some text
\\fbox{\\parbox[t][3cm]{2cm}{parbox top alignment, text parbox test text}}
some text
\\fbox{\\parbox[b][3cm]{2cm}{parbox bottom alignment, text parbox test text}}
some text.
% BUG: empty line here causes parse error!
\\end{itemize}

\\noindent
The following examples demonstrate all explicit \\emph{pos}/\\emph{inner-pos} combinations:
\\begin{itemize}
\\item center alignment:

\\noindent
Some text
\\fbox{\\parbox[c][3cm][t]{2cm}{parbox default alignment, parbox test text}}
some text
\\fbox{\\parbox[c][3cm][c]{2cm}{parbox top alignment, text parbox test text}}
some text
\\fbox{\\parbox[c][3cm][b]{2cm}{parbox bottom alignment, text parbox test text}}
some text.


\\item top alignment:

\\noindent
Some text
\\fbox{\\parbox[t][3cm][t]{2cm}{parbox default alignment, parbox test text}}
some text
\\fbox{\\parbox[t][3cm][c]{2cm}{parbox top alignment, text parbox test text}}
some text
\\fbox{\\parbox[t][3cm][b]{2cm}{parbox bottom alignment, text parbox test text}}
some text.

\\item bottom alignment:

\\noindent
Some text
\\fbox{\\parbox[b][3cm][t]{2cm}{parbox default alignment, parbox test text}}
some text
\\fbox{\\parbox[b][3cm][c]{2cm}{parbox top alignment, text parbox test text}}
some text
\\fbox{\\parbox[b][3cm][b]{2cm}{parbox bottom alignment, text parbox test text}}
some text.


\\item top/bottom in one line:

\\noindent
Some text
\\fbox{\\parbox[b][3cm][t]{2cm}{parbox default alignment, parbox test text}}
some text
\\fbox{\\parbox[t][3cm][c]{2cm}{parbox top alignment, text parbox test text}}
some text.
\\end{itemize}



\\subsection{Low-level box-interface}

\\LaTeX.js supports the following low-level \\TeX\\ commands:
%\\noindent\\fbox{
  \\verb|\\llap{|\\emph{text}\\verb|}|%}
,
%\\noindent\\fbox{
  \\verb|\\rlap{|\\emph{text}\\verb|}|%}
, and
  \\verb|\\smash{|\\emph{text}\\verb|}|, as well as
  \\verb|\\hphantom{|\\emph{text}\\verb|}|,
  \\verb|\\vphantom{|\\emph{text}\\verb|}|, and
  \\verb|\\phantom{|\\emph{text}\\verb|}|.

A phantom looks like this: \\phantom{phantom} yes, now the phantom is gone.

\\section{Spacing}

The following horizontal spaces are supported:
\\\\[8pt]
Negative thin space: |\\negthinspace| \\\\
No space (natural): || \\\\
Thin space: |\\,| or |\\thinspace| \\\\
Normal space: | | \\\\
Normal space: |\\ | \\\\
Non-break space: |~| \\\\
en-space: |\\enspace| \\\\
em-space: |\\quad| \\\\
2x em-space: |\\qquad|\\\\
3cm horizontal space: |\\hspace{3cm}| \\\\



\\section{Environments}

\\subsection{Lists: Itemize, Enumerate, and Description}

The \\texttt{itemize} environment is suitable for simple lists, the \\texttt{enumerate} environment for
enumerated lists, and the \\texttt{description} environment for descriptions.

\\begin{enumerate}
\\item You can nest the list environments to your taste:
    \\begin{itemize}
        \\item But it might start to look silly.
        \\item[-] With a dash.
    \\end{itemize}
\\item Therefore remember: \\label{remember}
    \\begin{description}
        \\item[Stupid] things will not become smart because they are in a list.
        \\item[Smart] things, though, can be presented beautifully in a list.
    \\end{description}
\\item[important] Technical note: Viewing this in Chrome, however, will show too much vertical space
    at the end of a nested environment (see above). On top of that, margin collapsing for inline-block
    boxes is not allowed. Maybe using \\texttt{dl} elements is too complicated for this and a simple nested
    \\texttt{div} should be used instead.
\\end{enumerate}
%
Lists can be deeply nested:
%
\\begin{itemize}
  \\item list text, level one
\\begin{itemize}
  \\item list text, level two
    \\begin{itemize}
      \\item list text, level three

        And a new paragraph can be started, too.
        \\begin{itemize}
          \\item list text, level four

            And a new paragraph can be started, too.
            This is the maximum level.

          \\item list text, level four
        \\end{itemize}

      \\item list text, level three
    \\end{itemize}
  \\item list text, level two
\\end{itemize}
  \\item list text, level one
  \\item list text, level one
\\end{itemize}


\\subsection{Flushleft, Flushright, and Center}

The \\texttt{flushleft} environment:
%
\\begin{flushleft}
This text is\\\\ left-aligned.
\\LaTeX{} is not trying to make
each line the same length.
\\end{flushleft}
%
The \\texttt{flushright} environment:
%
\\begin{flushright}
This text is right-\\\\aligned.
\\LaTeX{} is not trying to make
each line the same length.
\\end{flushright}
%
And the \\texttt{center} environment:
%
\\begin{center}
At the centre\\\\of the earth
\\end{center}



\\subsection{Quote, Quotation, and Verse}

The \\texttt{quote} environment is useful for quotes, important phrases and examples.
A typographical rule of thumb for the line length is:
\\begin{quote}
On average, no line should be longer than 66 characters.
\\end{quote}

There are two similar environments: the \\texttt{quotation} and the \\texttt{verse} environments.
The \\texttt{quotation} environment is useful for longer quotes going over several paragraphs,
because it indents the first line of each paragraph.

The \\texttt{verse} environment is useful for poems where the line breaks are important.
The lines are separated by issuing a \\texttt{\\textbackslash\\textbackslash} at the end of a line
and an empty line after each verse.

\\begin{verse}
Humpty Dumpty sat on a wall:\\\\
Humpty Dumpty had a great fall.\\\\
All the King’s horses and all the King’s men\\\\
Couldn’t put Humpty together again.

{\\raggedleft ---J.W. Elliott\\par}
\\end{verse}


\\subsection{Picture}

\\frame{\\setlength{\\unitlength}{20.4mm}
\\begin{picture}(3,2.1)(-1.2,-0.05)
  \\put(0,1){\\vector(1,0){1}}
  \\put(0,1){\\circle{2}}
  \\thicklines
  \\put(0,0){\\line(1,0){1}}
  \\put(0,0.01){xxxxxxxxxxx}
  \\put(0,0.1){XXXX}
\\end{picture}}
%
\\frame{\\setlength{\\unitlength}{1mm}
\\begin{picture}(60, 50)
  \\put(20,30){\\circle{1}}
  \\put(20,30){\\circle{2}}
  \\put(20,30){\\circle{4}}
  \\put(20,30){\\circle{8}}
  \\put(20,30){\\circle{16}}
  \\put(20,30){\\circle{32}}
  \\put(40,30){\\circle{1}}
  \\put(40,30){\\circle{2}}
  \\put(40,30){\\circle{3}}
  \\put(40,30){\\circle{4}}
  \\put(40,30){\\circle{5}}
  \\put(40,30){\\circle{6}}
  \\put(40,30){\\circle{7}}
  \\put(40,30){\\circle{8}}
  \\put(40,30){\\circle{9}}
  \\put(40,30){\\circle{10}}
  \\put(40,30){\\circle{11}}
  \\put(40,30){\\circle{12}}
  \\put(40,30){\\circle{13}}
  \\put(40,30){\\circle{14}}
  \\put(15,10){\\circle*{1}}
  \\put(20,10){\\circle*{2}}
  \\put(25,10){\\circle*{3}}
  \\put(30,10){\\circle*{4}}
  \\put(35,10){\\circle*{5}}
\\end{picture}}

\\frame{\\setlength{\\unitlength}{0.75mm}
\\begin{picture}(60,40)
  \\put(30,20){\\vector(1,0){30}}
  \\put(30,20){\\vector(4,1){20}}
  \\put(30,20){\\vector(3,1){25}}
  \\put(30,20){\\vector(2,1){30}}
  \\put(30,20){\\vector(1,2){10}}
  \\thicklines
  \\put(30,20){\\vector(-4,1){30}}
  \\put(30,20){\\vector(-1,4){5}}
  \\thinlines
  \\put(30,20){\\vector(-1,-1){5}}
  \\put(30,20){\\vector(-1,-4){5}}
\\end{picture}}
%
\\setlength{\\unitlength}{5cm}
\\begin{picture}(1,1)
  \\put(0,0){\\line(0,1){1}}
  \\put(0,0){\\line(1,0){1}}
  \\put(0,0){\\line(1,1){1}}
  \\put(0,0){\\line(1,2){.5}}
  \\put(0,0){\\line(1,3){.3333}}
  \\put(0,0){\\line(1,4){.25}}
  \\put(0,0){\\line(1,5){.2}}
  \\put(0,0){\\line(1,6){.1667}}
  \\put(0,0){\\line(2,1){1}}
  \\put(0,0){\\line(2,3){.6667}}
  \\put(0,0){\\line(2,5){.4}}
  \\put(0,0){\\line(3,1){1}}
  \\put(0,0){\\line(3,2){1}}
  \\put(0,0){\\line(3,4){.75}}
  \\put(0,0){\\line(3,5){.6}}
  \\put(0,0){\\line(4,1){1}}
  \\put(0,0){\\line(4,3){1}}
  \\put(0,0){\\line(4,5){.8}}
  \\put(0,0){\\line(5,1){1}}
  \\put(0,0){\\line(5,2){1}}
  \\put(0,0){\\line(5,3){1}}
  \\put(0,0){\\line(5,4){1}}
  \\put(0,0){\\line(5,6){.8333}}
  \\put(0,0){\\line(6,1){1}}
  \\put(0,0){\\line(6,5){1}}
\\end{picture}


\\frame{
  \\setlength{\\unitlength}{1cm}
  \\begin{picture}(6,5)
\\thicklines
\\put(1,0.5){\\line(2,1){3}}
\\put(4,2){\\line(-2,1){2}}
\\put(2,3){\\line(-2,-5){1}}
\\put(0.7,0.3){$A$}
\\put(4.05,1.9){$B$}
\\put(1.7,2.9){$C$}
\\put(3.1,2.5){$a$}
\\put(1.3,1.7){$b$}
\\put(2.5,1){$c$}
\\put(0.3,4){$F=\\sqrt{s(s-a)(s-b)(s-c)}$}
\\put(3.5,0.4){$\\displaystyle s:=\\frac{a+b+c}{2}$}
  \\end{picture}
}

\\setlength{\\unitlength}{2mm}
\\begin{picture}(30,20)
  \\linethickness{0.075mm}
  \\multiput(0,0)(1,0){26}{\\line(0,1){20}}
  \\multiput(0,0)(0,1){21}{\\line(1,0){25}}
  \\linethickness{0.15mm}
  \\multiput(0,0)(5,0){6}{\\line(0,1){20}}
  \\multiput(0,0)(0,5){5}{\\line(1,0){25}}
  \\linethickness{0.3mm}
  \\multiput(5,0)(10,0){2}{\\line(0,1){20}}
  \\multiput(0,5)(0,10){2}{\\line(1,0){25}}
\\end{picture}
%
\\setlength{\\unitlength}{0.7cm}
\\begin{picture}(6,4)
  \\linethickness{0.075mm}
  \\multiput(0,0)(1,0){7}{\\line(0,1){4}}
  \\multiput(0,0)(0,1){5}{\\line(1,0){6}}
  \\thicklines
  \\put(2,3){\\oval(3,1.8)}
  \\thinlines
  \\put(3,2){\\oval(3,1.8)}
  \\thicklines
  \\put(2,1){\\oval(3,1.8)[tl]}
  \\put(4,1){\\oval(3,1.8)[b]}
  \\put(4,3){\\oval(3,1.8)[r]}
  \\put(3,1.5){\\oval(1.8,0.4)}
\\end{picture}

\\setlength{\\unitlength}{0.8cm}
\\begin{picture}(6,4)
  \\linethickness{0.075mm}
  \\multiput(0,0)(1,0){7}{\\line(0,1){4}}
  \\multiput(0,0)(0,1){5}{\\line(1,0){6}}
  \\thicklines
  \\put(0.5,0.5){\\line(1,5){0.5}}
  \\put(1,3){\\line(4,1){2}}
  \\qbezier(0.5,0.5)(1,3)(3,3.5)
  \\thinlines
  \\put(2.5,2){\\line(2,-1){3}}
  \\put(5.5,0.5){\\line(-1,5){0.5}}
  \\linethickness{1mm}
  \\qbezier(2.5,2)(5.5,0.5)(5,3)
  \\thinlines
  \\qbezier(4,2)(4,3)(3,3)
  \\qbezier(3,3)(2,3)(2,2)
  \\qbezier(2,2)(2,1)(3,1)
  \\qbezier(3,1)(4,1)(4,2)
\\end{picture}



\\section{Labels and References}

Labels can be attached to parts, chapters, sections, items of enumerations, footnotes, tables and figures.
For instance: item~\\ref{remember} was important, and regarding fonts, read Section~\\ref{sec:advice}. And
below, we can reference item~\\ref{key-1} and \\ref{key-2}.

\\begin{enumerate}
  \\item list text, level one
\\begin{enumerate}
  \\item list text, level two
    \\begin{enumerate}
      \\item list text, level three

        And a new paragraph can be started, too.
        \\begin{enumerate}
          \\item list text, level four

            And a new paragraph can be started, too.
            This is the maximum level.

          \\item list text, level four \\label{key-1}
        \\end{enumerate}

      \\item list text, level three
    \\end{enumerate}
  \\item\\label{key-2} list text, level two
\\end{enumerate}
  \\item list text, level one
  \\item list text, level one
\\end{enumerate}


\\section{Mathematical Formulae}

Math is typeset using KaTeX. Inline math:
$
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\, d\\xi
$
as well as display math is supported:
$$
f(n) = \\begin{cases} \\frac{n}{2}, & \\text{if } n\\text{ is even} \\\\ 3n+1, & \\text{if } n\\text{ is odd} \\end{cases}
$$


\\section{Groups}


Today is \\today.

Actually, what about { some groups? } They\\,are\\ \\ \\ \\ \\ nice.


\\section{Symbols}
\\label{sec:symbols}

\\noindent
lowercase greek letters:
\\textalpha \\textbeta \\textgamma \\textdelta \\textepsilon \\textzeta \\texteta \\texttheta \\textiota \\textkappa
\\textlambda \\textmu \\textnu \\textxi \\textomikron \\textpi \\textrho \\textsigma \\texttau \\textupsilon \\textphi \\textchi
\\textpsi \\textomega

\\noindent
uppercase greek letters:
\\textAlpha \\textBeta \\textGamma \\textDelta \\textEpsilon \\textZeta \\textEta \\textTheta \\textIota \\textKappa
\\textLambda \\textMu \\textNu \\textXi \\textOmikron \\textPi \\textRho \\textSigma \\textTau \\textUpsilon \\textPhi \\textChi
\\textPsi \\textOmega

\\noindent
currencies:
\\texteuro \\textcent \\textsterling \\pounds \\textbaht \\textcolonmonetary \\textcurrency \\textdong \\textflorin \\textlira
\\textnaira \\textpeso \\textwon \\textyen

\\noindent
old-style numerals:
\\textzerooldstyle \\textoneoldstyle \\texttwooldstyle \\textthreeoldstyle \\textfouroldstyle \\textfiveoldstyle
\\textsixoldstyle \\textsevenoldstyle \\texteightoldstyle \\textnineoldstyle

\\noindent
math:
\\textperthousand \\perthousand \\textpertenthousand \\textonehalf \\textthreequarters \\textonequarter
\\textfractionsolidus \\textdiv \\texttimes \\textminus \\textpm \\textsurd \\textlnot \\textasteriskcentered
\\textonesuperior \\texttwosuperior \\textthreesuperior

\\noindent
arrows:
\\textleftarrow \\textuparrow \\textrightarrow \\textdownarrow

\\noindent
misc:
\\checkmark \\textreferencemark \\textordfeminine \\textordmasculine \\textmarried \\textdivorced \\textbar \\textbardbl
\\textbrokenbar \\textbigcircle \\textcopyright \\copyright \\textcircledP \\textregistered \\textservicemark
\\texttrademark \\textnumero \\textrecipe \\textestimated \\textmusicalnote \\textdiscount

\\noindent
non-ASCII:
\\AE \\ae \\IJ \\ij \\OE \\oe \\TH \\th \\SS \\ss \\DH \\dh \\O \\o \\DJ \\dj \\L \\l \\i \\j \\NG \\ng


\\section{Fonts}

Usually, \\LaTeX.js chooses the right font---just like \\LaTeX.  In some cases,
one might like to change fonts and sizes by hand. To do this, use the standard
commands. The actual size of each font is a design issue and depends
on the document class (in this case on the CSS file).

{\\small The small and
  \\textbf{bold} Romans ruled}
  {\\Large all of great big
  \\textit{Italy}.}

\\textit{You can also
  \\emph{emphasize} text if
  it is set in italics,}
  \\textsf{in a
  \\emph{sans-serif} font,}
  \\texttt{or in
  \\emph{typewriter} style.}

The environment form of the font commands is available, too:

\\begin{center}
\\begin{itshape}
This whole paragraph is emphasized, for instance.
\\end{itshape}
\\end{center}


\\subsection{An advice}
\\label{sec:advice}
\\begin{center}
  \\underline{\\textbf{Remember\\Huge!}} \\textit{The}
  \\textsf{M\\textbf{\\LARGE O}\\texttt{R}\\textsl{E}} fonts \\Huge you
  \\tiny use \\footnotesize \\textbf{in} a \\small \\texttt{document},
  \\large \\textit{the} \\normalsize more \\textsc{readable} and
  \\textsl{\\textsf{beautiful} it bec\\large o\\Large m\\LARGE e\\huge s}.
\\end{center}


\\appendix

\\section{Source}

The source of \\LaTeX.js is here on GitHub: \\url{https://github.com/michael-brade/LaTeX.js}

\\end{document}

        ', 1);

INSERT INTO BaseElements (title, category,  type, is_pivotal, source, clipboard, body/* group_id, author_id, created*/) VALUES
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

INSERT INTO MaterialBaseElements (material_id, position, base_element_id) VALUES
	(1, 1, 1),
	(1, 2, 2),
	(2, 1, 3),
	(2, 2, 4),
	(3, 1, 5),
	(4, 1, 6),
	(4, 4, 7),
	(5, 1, 8),
	(6, 1, 9),
	(6, 2, 10),
	(7, 1, 11),
	(7, 1, 12),
	(8, 1, 13),
	(9, 1, 14),
	(9, 1, 15),
	(10, 1, 16),
	(11, 1, 17),
	(12, 1, 18),
	(13, 1, 19),
	(14, 1, 20),
	(14, 2, 21),
	(15, 1, 22),

	(15, 2, 23),
	(16, 1, 24),
	(16, 2, 25),
	(17, 1, 26),
	(17, 2, 27),
	(18, 1, 28),
	(18, 2, 29),
	(19, 1, 30),
	(21, 1, 31),
	(21, 2, 32),
	(21, 3, 33);

COMMIT;
