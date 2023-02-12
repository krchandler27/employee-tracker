INSERT INTO department (dept_name)
VALUES ('Sales'),
('Secretarial'),
('Software Development'),
('Legal'),
('Finance');

INSERT INTO roles (title, salary, dept_id)
VALUES ('Senior Developer', 120000, 3),
('Junior Developer', 80000, 3),
('Account Representative', 95000, 2),
('Sales Representative', 80000, 1),
('Sales Manager', 120000, 1),
('Accountant', 80000, 5),
('Secretary', 65000, 2),
('Data Analyst', 80000, 1),
('Paralegal', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Keri", "Time", 01, NULL),
("Josiah", "Brown", 02, 01),
("Jakob", "Black", 03, NULL),
("Janalee", "Hironaka", 04, NULL),
("Jess", "Smith", 05, 03),
("Finn", "Swift", 06, NULL),
("Jen", "Bachner", 07, NULL),
("Sheri", "Hindz", 08, NULL),
("Terri", "Coder", 09, NULL);
