import React, { useState, useEffect } from 'react'
import TablePagination from '../components/DesktopTablePagination'

export default function ViewExpenditure() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [save, setSave] = useState([]);
    const tableHead = ['Income Id', 'Amount', 'Date'];

    useEffect(() => {
        const fetchData = async () => {
            try{
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/view`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.status){
                        setData(data.data);
                        setLoading(false);
                    } else {
                        setError(true);
                    }
                })
            } catch (e) {
                console.error('Error fetching data:',e.message);
            }
        }
        // fetchData();
        setTimeout(() => {
            setData([
                {trans_id:7, amount: 100,status: true, date: '2021-05-01'},
                {trans_id:8, amount: 800,status: true, date: '2021-05-01'},
                {trans_id:9, amount: 300,status: true, date: '2021-05-01'},
                {trans_id:6, amount: 100,status: true, date: '2021-05-01'},
                {trans_id:5, amount: 800,status: true, date: '2021-05-01'},
                {trans_id:4, amount: 300,status: true, date: '2021-05-01'},
                {trans_id:3, amount: 100,status: true, date: '2021-05-01'},
                {trans_id:2, amount: 800,status: true, date: '2021-05-01'},
                {trans_id:1, amount: 300,status: true, date: '2021-05-01'},
                {trans_id:71, amount: 100,status: true, date: '2021-05-01'},
                {trans_id:81, amount: 800,status: true, date: '2021-05-01'},
                {trans_id:91, amount: 300,status: true, date: '2021-05-01'}
            ])
            setLoading(false);
        }, 2000);
    }, [])

    const editTableRow = (event) => {
        Array.from(event.target.closest('tr').children).map((child) => {
            let eventID = event.target.closest('tr').getAttribute('id')
            if(child.getAttribute('data-editable') == 'true') {
                child.setAttribute('contenteditable', true);
                child.focus();
                if(!save.includes(parseInt(eventID))){ setSave([...save, parseInt(eventID)])}
            } 
        })

    }

    const saveEditedData = (event) => {
        let eventID = event.target.closest('tr').getAttribute('id')
        setSave(save.filter((item) => item != parseInt(eventID)));
            Array.from(event.target.closest('tr').children).map((child) => {
                if(child.getAttribute('data-editable') == 'true') {
                    child.setAttribute('contenteditable', false);
                } 
            })
    }

  return (
    <>
        {
            loading ? <div className='center loader'>Loading...</div> 
            : error ? <div className='center loader'>Error fetching data!</div> 
            : <div className='center'>
                <TablePagination 
                tableHead={tableHead} 
                data={data} 
                itemsPerPage={10}
                editTableRow={editTableRow}
                isSaveEnabled={save}
                saveEditedData={saveEditedData} />
              </div>
        }
    </>
  )
}
