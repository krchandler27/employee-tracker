const consTab = require('console.table');
const doTenv = require('dotenv');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker'
    }
);

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the employee_tracker db.:)')
    startInquire();
})

const startInquire = () => {
    inquirer.createPromptModule([
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
        case 'View All Employees':
viewEmploys();
break;
            case 'Add New Employee':
newEmploy();
break;
            case 'View All Roles':
viewRoles();
break;
            case 'Add New Role':
newRole();
break;
            case 'View All Departments':
viewDeps();
break;
            case 'Add New Department':
newDep();
break;
            case 'Exit':
Connection.end();
break;
    })
    .catch ((err)) => {
    if (err) throw err;
}
};