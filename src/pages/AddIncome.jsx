import React, { useRef } from 'react'

export default function AddIncome() {
    const amount = useRef(null);
    const submitPayment = async (event) => {
        event.preventDefault();
        try{
            if(amount.current.value === ''){
                 alert('Please enter an amount')
            } else {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/income/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        amount: amount.current.value,
                        payment_type: event.target.getAttribute('payment_type')
                    })
                })
                .then(response => response.json())
                .then(data => {
                  if(data.status){
                    alert('Payment added successfully')
                    amount.current.value = ''
                  } else {
                    alert('Failed to add Payment!');
                  }
                })
            }
        } catch (e) {
            console.error('Error submitting data:',e.message);
        }

    }

  return (
    <div className='center'>
        <h1>Income</h1>
        <div className='income_box'>
            <label>Amount</label>
            <span></span>
            <input type="number" ref={amount} required />
            <div className='income_buttons'>
                <button onClick={submitPayment} payment_type="upi" >UPI</button>
                <button onClick={submitPayment} payment_type="cash" >Cash</button>
                <button onClick={submitPayment} payment_type="pending" >Pending</button>  
            </div>
        </div>
    </div>
  )
}
