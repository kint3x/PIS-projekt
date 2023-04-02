import React from 'react'
import InteractiveTable from '../utils/interactiveTable/InteractiveTable';
 
export default class MeetingsTable extends React.Component {
    
    render () {
        const data = this.props.data
        const method = this.props.method
        
        return (
            <InteractiveTable
                onItemClick = {method} 
                tableStyles={'responsive'}
                dataList={data} 
                columns={
                    {
                        client: {
                            alias: 'Client',
                            sortable: true,
                            active: true,
                            sortingKey: 'client'
                        },
                        employee: {
                            alias: 'Employee',
                            sortable: true,
                            active: false,
                            sortingKey: 'employee'
                        },
                        subject: {
                            alias: 'Subject',
                            sortable: true,
                            active: false,
                            sortingKey: 'subject'
                        },
                        dateStart: {
                            alias: 'End',
                            sortable: true,
                            active: false,
                            sortingKey: 'dateStart'
                        },
                        dateEnd: {
                            alias: 'End',
                            sortable: true,
                            active: false,
                            sortingKey: 'dateEnd'
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
}
