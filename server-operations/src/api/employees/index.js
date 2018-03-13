import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import employees from './data';

const router = new Router();

router.get('/', (req, res) => {
    const { skip, take, sort, toplevel } = req.query;

    let result = employees.slice(0);

    if (toplevel) {
        result = result.filter(x => !x.ReportsTo);
    }

    if (sort) {
        const field = sort[0].field;
        const direction = sort[0].dir;
        
        result.sort((x, y) => {
            const valX = x[field];
            const valY = y[field];
            let comparisonResult = 0;

            if (valX > valY) {
                comparisonResult = 1;
            } else if (valX < valY) {
                comparisonResult = -1;
            }

            if(comparisonResult !== 0 && direction === 'desc') {
                return comparisonResult * (-1);
            }

            return comparisonResult;
        });
    }

    const begin = skip ? parseInt(skip) : 0;
    const end = take ? begin + parseInt(take) : employees.length;

    res.send({
        employees: result.slice(begin, end),
        total: employees.length
    });
});

router.get('/:id/subordinates', (req, res) => {
    const id = parseInt(req.params.id);
    
    res.send({
        employees: employees.filter(x => x.ReportsTo === id)
    });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(x => x.EmployeeId === id);

    if (employee) {
        res.send(employee);
    } else {
        res.status(404).send({ message: 'Employee not found.' });
    }
});

router.post('/', (req, res) => {
    const employee = req.body;
    employee.EmployeeId = parseInt(employee.EmployeeId);
    employee.Extension = parseInt(employee.Extension);
    employees.push(employee);
    
    res.send(employee);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(x => x.EmployeeId === id);

    if (index > -1) {

        const updatedEmployee = req.body;
        updatedEmployee.EmployeeId = parseInt(updatedEmployee.EmployeeId);
        updatedEmployee.Extension = parseInt(updatedEmployee.Extension);
        console.log(updatedEmployee);
        employees[index] = updatedEmployee;

        res.send(employees[index]);
    } else {
        res.status(404).send({ message: 'Employee not found.' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = employees.findIndex(x => {
        console.log(x.EmployeeId);
        return x.EmployeeId === id;
    });

    if (index > -1) {
        employees.splice(index, 1);
        res.send({ message: 'Record deleted.'});
    } else {
        res.status(404).send({ message: 'Employee not found.' });
    }
});

export default router;
