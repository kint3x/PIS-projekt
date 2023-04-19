import React from 'react'
import InteractiveTable from '../../utils/interactiveTable/InteractiveTable';
 
const ClientsTable = ({data,buttonsNum,button1name,button1OnClick,button2name,button2OnClick,addEnabled,addOnClick}:any) => {
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