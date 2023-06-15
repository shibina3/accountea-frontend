import React, { useRef } from 'react'

export default function AddExpenditure() {
    const amount = useRef(null);
    const expense = useRef(null);
    const submitExpense = async (event) => {
        event.preventDefault();
        try{
            if(amount.current.value === '' || expense.current.value === ''){
                    alert('Please enter all the fields')
            } else {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/expenditure/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }   ,
                    body: JSON.stringify({
                        amount: amount.current.value,
                        expense: expense.current.value
                    })
                })
                .then(response => response.json())
                .then(data => {
                  if(data.status){
                    alert('Expense added successfully')
                    amount.current.value = ''
                    expense.current.value = ''
                  } else {
                    alert('Failed to add Expense!');
                  }
                })
            }
        } catch (e) {
            console.error('Error submitting data:',e.message);
        }
    }

  return (
    <div className='center'>
        <h1>Expenditure</h1>
        <div className='expense_box'>
            <div>
                <label>Amount</label>
                <span></span>
                <input type="number" required ref={amount} />
            </div>
            <div>
                <label>Expense</label>
                <span></span>
                <input type="text" required ref={expense} />
            </div>
            <div className='income_buttons'>
                <button onClick={submitExpense} >Add</button> 
            </div>
        </div>
    </div>
  )
}
