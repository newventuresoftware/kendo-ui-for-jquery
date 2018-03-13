;(function(){
    'use strict';

    const columns = [
        { field: 'EmployeeId', title: 'Id', width: 100 },
        { field: 'ReportsTo', width: 100 },
        { field: 'FirstName', title: 'First Name', width: 120 },
        { field: 'LastName', title: 'Last Name', width: 120 },
        { field: 'BirthDate', title: 'Birth Date', template: '#= kendo.toString(BirthDate, "D") #', width: 150 }
    ];

    const treeListDataSource = {
        transport: {
            read: {
                url: (data) => {
                    if (data.id) {
                        return `api/employees/${data.id}/subordinates`;
                    }

                    return 'api/employees?toplevel=true';
                },
                type: 'GET',
                dataType: 'json'
            }
        },
        schema: {
            data: 'employees',
            model: {
                id: 'EmployeeId',
                parentId: 'ReportsTo',
                hasChildren: true,
                fields: {
                    EmployeeId: { type: 'number', nullable: false },
                    BirthDate: { type: 'date' },
                    Extension: { type: 'number' },
                    ReportsTo: { field: "ReportsTo",  nullable: true }
                }
            }
        },
        serverSorting: true,
        serverFiltering: true,
        serverPaging: true
    };

    $(() => {
        const treeList = $('#tree-list').kendoTreeList({
            columns: columns,
            dataSource: new kendo.data.TreeListDataSource(treeListDataSource),
            height: 540
        }).data('kendoTreeList');
    });
}());
