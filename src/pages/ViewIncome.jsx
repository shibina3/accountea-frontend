import React, { useState, useEffect, useRef } from 'react'
import TablePagination from '../components/MobileTablePagination'

export default function ViewExpenditure() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [transId, setTransId] = useState(0);
    const editAmount = useRef(null);
    const modalRef = useRef(null);
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
        let trans_id = parseInt(event.target.closest('tr').getAttribute('id')),
        editData = data.filter((item) => item.trans_id === trans_id)[0];
        setTransId(trans_id);
        modalRef.current.style.display = 'block';
        editAmount.current.value = editData.amount;
    }

    const updateIncome = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/expenditure/edit/${transId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trans_id: transId,
                amount: editAmount.current.value,
                timestamp: new Date()
            })
        })
    }

  return (
    <>
        {
            loading ? <div className='center loader'>Loading...</div> 
            : error ? <div className='center loader'>Error fetching data!</div> 
            : <div className='center table_center'>
                <TablePagination 
                tableHead={tableHead} 
                data={data} 
                itemsPerPage={10}
                editTableRow={editTableRow} />
              </div>
        }
        <div className='modal' ref={modalRef}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <span className='close' onClick={() => modalRef.current.style.display = 'none'}>&times;</span>
                        <h3>Edit Expenditure</h3>
                    </div>
                    <div className='modal-body'>
                        <form>
                            <div className='txt_field'>
                                <input type='number' ref={editAmount} required />
                                <span></span>
                                <label>Amount</label>
                            </div>
                            <div className='modal-footer'>
                                <input type='submit' onClick={updateIncome} value='Update' />
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
    </>
  )
}
