INSERT INTO department (dept_name)
VALUES ('Sales'),
('Secretarial'),
('Software Development'),
('Legal'),
('Finance');

INSERT INTO roles (title, salary, dept_id)
VALUES ('Senior Software Developer', 120000, 3),
('Junior Software Developer', 80000, 3),
('Account Representative', 95000, 2),
('Sales Representative', 80000, 1),
('Sales Manager', 120000, 1),
('Accountant', 80000, 5),
('Secretary', 65000, 2),
('Data Analyst', 80000, 1),
('Paralegal', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Keri", "Time", 1, NULL),
("Josiah", "Brown", 2, NULL),
("Jakob", "Black", 3, NULL),
("Janalee", "Hironaka", 4, NULL),
("Jess", "Smith", 5, NULL),
("Finn", "Swift", 6, NULL),
("Jen", "Bachner", 7, NULL),
("Sheri", "Hindz", 8, NULL),
("Terri", "Coder", 9, NULL);
