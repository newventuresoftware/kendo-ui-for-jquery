;(function(){
    'use strict';

    const columns = [
        { command: ['edit', 'destroy'], width: 100 },
        { field: 'EmployeeId', title: 'Id', width: 100 },
        { field: 'FirstName', title: 'First Name', width: 120 },
        { field: 'LastName', title: 'Last Name', width: 120 },
        { field: 'BirthDate', title: 'Birth Date', template: '#= kendo.toString(BirthDate, "D") #', width: 150 },
        { field: 'Extension', width: 100 }
    ];

    const gridDataSource = {
        transport: {
            read: {
                url: '/api/employees',
                type: 'GET'
            },
            create: {
                url: '/api/employees',
                type: 'POST'
            },
            update: {
                url: function(employee) {
                    return '/api/employees/' + employee.EmployeeId;
                },
                type: 'PUT'
            },
            destroy: {
                url: function(employee) {
                    return '/api/employees/' + employee.EmployeeId;
                },
                type: 'DELETE'
            }
        },
        error: e => console.log(e.message),
        schema: {
            total: 'total',
            data: 'employees',
            model: {
                id: 'EmployeeId',
                fields: {
                    EmployeeId: { type: 'number' },
                    BirthDate: { type: 'date' },
                    Extension: { type: 'number' }
                }
            }
        },
        pageSize: 5,
        serverSorting: true,
        serverFiltering: true,
        serverPaging: true
    };

    $(() => {
        $('#grid').kendoGrid({
            columns: columns,
            dataSource: gridDataSource,
            sortable: true,
            editable: 'inline',
            pageable: true,
            toolbar: ['create', 'save', 'cancel'],
            scrollable: {
                virtual: true
            }
        });
    });

}());
