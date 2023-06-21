import React, { useState } from 'react';
import EditButton from '../assets/images/edit.svg'
import SaveButton from '../assets/images/save.svg'

const Table = ({ data, itemsPerPage, tableHead, editTableRow, isSaveEnabled, saveEditedData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
                tableHead.map((item, index) => {
                    return <th key={index}>{item}</th>
                })
            }
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index} id={item.expend_id || item.trans_id}>
                {
                    Object.keys(item).filter(data => data !== 'status').map((key, index) => {
                        return <td data-editable={key === ('amount' || 'expense') ? true : false} key={index}>{item[key]}</td>
                    })
                }
                <td>
                    {
                        isSaveEnabled.includes(item.trans_id) || isSaveEnabled.includes(item.expend_id) ? <button className='edit_button' onClick={(e)=>saveEditedData(e)}><img src={SaveButton} alt="Save" /></button> 
                        : <button className='edit_button' onClick={(e)=>editTableRow(e)}><img src={EditButton} alt="Edit" /></button>
                    }
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='container'>
        <button className='prev-button' onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt; Prev
        </button>
        <span>{currentPage}</span>
        <button className='next-button' onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
