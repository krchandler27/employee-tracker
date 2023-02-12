const consTab = require('console.table')
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
                    newEmployee()
                    break
                case 'View All Roles':
                    viewRoles()
                    break
                case 'Add New Role':
                    newRole()
                    break
                case 'View All Departments':
                    viewDeps()
                    break
                case 'Add New Department':
                    newDep()
                    break
                case 'Exit':
                    console.log('Have a great day. Goodbye!')
                    db.end()
                    break
            }
        })

    const viewEmployees = () => {
        console.log('You are now viewing all current employees in the employee_tracker database.')
        db.query('SELECT * FROM employee', function (err, res) {
            if (err) {
                throw err
            } else {
                console.table(res)
                openDBConnection()
            }
        })
    }


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