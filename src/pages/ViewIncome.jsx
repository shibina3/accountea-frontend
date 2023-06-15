import React, { useState, useEffect } from 'react'
import TablePagination from '../components/TablePagination'

export default function ViewExpenditure() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
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
        fetchData();
    }, [])

  return (
    <>
        {
            loading ? <div className='center loader'>Loading...</div> : error ? <div className='center loader'>Error fetching data!</div> : <div className='center'><TablePagination tableHead={tableHead} data={data} itemsPerPage={15} /></div>
        }
    </>
  )
}
