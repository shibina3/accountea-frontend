import React, { useState } from 'react';

const Table = ({ data, itemsPerPage, tableHead }) => {
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
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
                {
                    Object.keys(item).filter(data => data !== 'status').map((key, index) => {
                        return <td key={index}>{item[key]}</td>
                    })
                }
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
