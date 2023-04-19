import React from 'react'
import InteractiveTable from '../../utils/interactiveTable/InteractiveTable';
 
const MeetingsTable = ({data,buttonsNum,button1name,button1OnClick,button2name,button2OnClick,addEnabled,addOnClick}:any) => {
    
        return (
            <InteractiveTable
                buttonsNum = {buttonsNum}
                button1name = {button1name} 
                button1OnClick = {button1OnClick} 
                button2name = {button2name} 
                button2OnClick = {button2OnClick}
                
                addEnabled = {addEnabled}
                addOnClick = {addOnClick}    


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
                            alias: 'Start',
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

export default MeetingsTable;
