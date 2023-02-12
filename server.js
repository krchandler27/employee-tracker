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
            message: 'Choose from below...',
            choices: [
                'View All Employees',
                'Add New Employee',
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
        console.log('You are now viewing all current employees in the employee_tracker database.')
        db.promise().query('SELECT * FROM employee', function (err, res) {
            if (err) {
                throw err
            } else {
                console.table(res)
                openDBConnection()
            }
        })
    }

    const addEmployee = () => {
        console.log('You are now adding an employee to the employee_tracker database.')

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Employee's First Name:",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Employee's Last Name:",
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "Employee's Role ID:",
                },
                {
                    type: "input",
                    name: "manager_id",
                    message: "Employee's Manager ID:",
                },
            ])

            .then((response) => {
                const employee = {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.role_id,
                    manager_id: response.manager_id
                }
                // Inserting gathered info from inquirer into the employee table in the database
                db.promise().query('INSERT INTO employee SET ?', employee)

                // Displaying table with new employee added.
                db.query('SELECT * FROM employee', function (err, res) {
                    if (err) {
                        throw err
                    }
                    else {
                        console.table(res)
                        console.log('Employee successfully added.')
                        openDBConnection()
                    }
                }
                )
            })


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
    }
}