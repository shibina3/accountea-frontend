import React, { useRef } from 'react'

export default function Income() {
    const amount = useRef(null);
    const submitPayment = async (event) => {
        event.preventDefault();
        try{
            if(amount.current.value === ''){
                 alert('Please enter an amount')
            } else {
                const response = await fetch('/api/income/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: amount.current.value,
                        payment_type: event.target.getAttribute('payment_type')
                    })
                })

                if(response.status === 200){
                    alert('Payment added successfully')
                    amount.current.value = ''
                } else {
                    console.error('Error submitting data:',response.status)
                }
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
