import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

const Paginations = ({ vendorsPerpage, totalVendors, paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVendors / vendorsPerpage); i++) {
    pageNumbers.push(i);
  }
  const handleChange = (event, value) => {
    paginate(value)
  };

  return (
    <div>
      <Pagination 
        shape="rounded" 
        variant="outlined"
        count={pageNumbers.length} 
        onChange={handleChange } />
    </div>
  )
}

export default Paginations