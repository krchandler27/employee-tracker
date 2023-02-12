INSERT INTO department (dept_name)
VALUES ('Sales'),
('Software Development'),
('Legal'),
('Finance'),
('Administration');

INSERT INTO roles (title, salary, dept_id)
VALUES ('Senior Software Developer', 120000, 2),
('Junior Software Developer', 80000, 2),
('Account Representative', 95000, 1),
('Sales Representative', 80000, 1),
('Sales Manager', 120000, 1),
('Accountant', 80000, 4),
('Secretary', 65000, 5),
('Data Analyst', 80000, 1),
('Paralegal', 90000, 3),
('CEO', 350000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Keri", "Time", 1, NULL),
("Josiah", "Brown", 5, NULL),
("Jakob", "Black", 3, NULL),
("Janalee", "Hironaka", 8, 2),
("Jess", "Smith", 4, 2),
("Finn", "Swift", 6, NULL),
("Jen", "Bachner", 9, NULL),
("Sheri", "Hindz", 10, NULL),
("Terri", "Coder", 7, 8),
("Katie", "Speakman", 2, 1);
