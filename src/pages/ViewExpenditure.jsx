import React, { useState, useEffect, useRef } from 'react'
import TablePagination from '../components/MobileTablePagination'

export default function ViewExpenditure() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [expendId, setExpendId] = useState(0);
    const modalRef = useRef(null);
    const editAmount = useRef(null);
    const editExpense = useRef(null);
    const tableHead = [ 'Amount', 'Expense', 'Date'];
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/expenditure/view`, {
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
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'},
                {expend_id:7, amount: 100, expense: 'sugar',status: true, date: '2021-05-01'},
                {expend_id:8, amount: 800, expense: 'salt',status: true, date: '2021-05-01'},
                {expend_id:9, amount: 300, expense: 'oil',status: true, date: '2021-05-01'}
            ])
            setLoading(false);
        }, 2000);
    }, [])

    const editTableRow = (event) => {
        let expend_id = parseInt(event.target.closest('tr').getAttribute('id')),
        editData = data.filter((item) => item.expend_id === expend_id)[0];
        setExpendId(expend_id);
        modalRef.current.style.display = 'block';
        editAmount.current.value = editData.amount;
        editExpense.current.value = editData.expense;
    }

    const updateExpenditure = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/expenditure/edit/${expendId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                expend_id: expendId,
                amount: editAmount.current.value,
                expense: editExpense.current.value,
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
                editTableRow={editTableRow} 
                tableHead={tableHead} 
                data={data} 
                itemsPerPage={10} />
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
                            <div className='txt_field'>
                                <input type='text' ref={editExpense} required />
                                <span></span>
                                <label>Expense</label>
                            </div>
                            <div className='modal-footer'>
                                <input type='submit' onClick={updateExpenditure} value='Update' />
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
    </>
  )
}
