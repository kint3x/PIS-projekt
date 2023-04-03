import React from 'react'
import InteractiveTable from '../../utils/interactiveTable/InteractiveTable';
 
const ClientsTable = ({data,method}:any) => {
        
        return (
            <InteractiveTable
                onItemClick = {method} 
                tableStyles={'responsive'}
                dataList={data} 
                columns={
                    {
                        name: {
                            alias: 'Name',
                            sortable: true,
                            active: true,
                            sortingKey: 'name'
                        },
                        email: {
                            alias: 'Email',
                            sortable: true,
                            active: false,
                            sortingKey: 'email'
                        },
                        phone: {
                            alias: 'Phone',
                            sortable: true,
                            active: false,
                            sortingKey: 'phone'
                        },
                    }
                }
                searching={{
                    active: true,
                    searchPlaceholder: 'Search...',
                    searchKeys: ['name', 'email', 'phone']
                }}
                paging={{
                    maxRows: 5,
                    prevBtn: 'Prev',
                    nextBtn: 'Next',
                    showAll: true,
                    showAllText: 'show all',
                    joinPages: false
                }}
            />
        )
}

export default ClientsTable;