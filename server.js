const cTable = require('console.table')
require('dotenv').config()
const inquirer = require('inquirer')
const mysql = require('mysql2')
const app = require('express')

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_tracker'
})

db.connect(function (err) {
    if (err) throw err
    console.log('You are now connected to the employee_tracker db.:)')
    openDBConnection()
})

const openDBConnection = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'openingScreen',
            message: 'What would you like to do next?',
            choices: [
                'View All Employees',
                'Add New Employee',
                'Update Current Employee',
                'View All Roles',
                'Add New Role',
                'View All Departments',
                'Add New Department',
                'Exit'
            ]
        }
    ])
        .then((response) => {
            switch (response.openingScreen) {
                case 'View All Employees':
                    viewEmployees()
                    break
                case 'Add New Employee':
                    addEmployee()
                    break
                case 'Update Employee Role':
                    updateEmployeeRole()
                    break
                case 'View All Roles':
                    viewRoles()
                    break
                case 'Add New Role':
                    addRole()
                    break
                case 'View All Departments':
                    viewDeps()
                    break
                case 'Add New Department':
                    addDep()
                    break
                case 'Exit':
                    console.log('Have a great day. Goodbye!')
                    db.end()
                    break
            }
        })

    const viewEmployees = () => {
        console.log('You are viewing all current employees in the employee_tracker database.')
        db.query('SELECT * FROM employees', function (err, res) {
            if (err) {
                throw err
            } else {
                console.table(res)
                openDBConnection()
            }
        })
    }

    const addEmployee = () => {
        console.log('You are adding a new employee to the employee_tracker database.')

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'First Name:',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Last Name:',
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Role ID:',
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Manager ID:',
                },
            ])

            .then((response) => {
                const employee = [
                    response.first_name,
                    response.last_name,
                    parseInt(response.role_id),
                    response.manager_id === 'null' ? null : parseInt(response.manager_id)
                ]
                // Inserting gathered info from inquirer into the employee table in the database
                db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', employee)

                // Displaying table with new employee added.
                db.query('SELECT * FROM employees', function (err, res) {
                    if (err) {
                        throw err
                    }
                    else {
                        console.table(res)
                        console.log('Employee successfully added.')
                        openDBConnection()
                    }
                })
            })
    }

    // const updateEmployeeRole = () => {

    // }

    const viewRoles = () => {
        console.log('You are now viewing all current employee roles in the employee_tracker database.')
        db.query('SELECT * FROM roles', function (err, res) {
            if (err) {
                throw err
            } else {
                console.table(res)
                openDBConnection()
            }
        })
    }

    const addRole = () => {
        console.log('You are adding a new role to the database.')
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Role Title:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Salary:',
                },
                {
                    type: 'input',
                    name: 'dept_id',
                    message: 'Department ID:',
                }
            ])

            .then((response) => {
                const newRole = [
                    response.title,
                    response.salary,
                    response.dept_id,
                ]
                // Inserting gathered info from inquirer into the roles table in the database
                db.query('INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)', newRole)

                // Displaying table with new role added.
                db.query('SELECT * FROM roles', function (err, res) {
                    if (err) {
                        throw err
                    }
                    else {
                        console.table(res)
                        console.log('Role successfully added. See the new complete list of company roles above^^^.')
                        openDBConnection()
                    }
                })
            })
    }

    const viewDeps = () => {
        console.log('You are viewing all current departments in the employee_tracker database.')
        db.query('SELECT * FROM departments', function (err, res) {
            if (err) {
                throw err
            } else {
                console.table(res)
                openDBConnection()
            }
        })
    }

    const addDep = () => {
        console.log('You are adding a new department to the database.')
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'dept_name',
                    message: 'Department Name:',
                }
            ])

            .then((response) => {

                // Inserting gathered info from inquirer into the department table in the database
                db.query('INSERT INTO departments (dept_name) VALUE (?)', response.dept_name)

                // Displaying table with new department added.
                db.query('SELECT * FROM departments', function (err, res) {
                    if (err) {
                        throw err
                    }
                    else {
                        console.table(res)
                        console.log('Department successfully added. See the new complete list of departments above^^^.')
                        openDBConnection()
                    }
                })
            })
    }

}
