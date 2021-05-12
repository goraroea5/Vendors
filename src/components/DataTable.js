import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import { Close, Store } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

function CustomPagination() {
  const classes = useStyles();
  const { state, apiRef } = useGridSlotComponentProps();
  return (
    <Pagination
      className={classes.root}
      color="primary"
      shape="rounded" 
      variant="outlined"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}
function statusVendor(params) {
  const status = params.row.status
  if (status) {
    return (
      <Chip icon={<Store />} label="เปิดทำการ" color="primary" />
    )
  }
  else {
    return (
      <Chip  icon={<Close />} label="ปิดทำการ" color="secondary" />
    )
  }
}

const DataTable = ({vendors}) => {
  const columns = [
    { field: 'store_name', headerName: 'รายชื่อร้าน', flex: 2 },
    { field: 'type', headerName: 'ประเภทร้านค้า', flex: 1 },
    { field: 'tel', headerName: 'เบอรโทรศัพท์', flex: 1 },
    { field: 'status', headerName: 'สถานะ', flex: 0.5, renderCell: statusVendor},
  ]
  const rows = vendors.map((vendor) => {
    return {
      obj: vendor,
      id: parseInt(vendor.vendor_id),
      store_name: vendor.store_name,
      type: vendor.categories.name,
      tel: vendor.store_phone,
      status: vendor.open
    }
  })
  console.log('rows',rows);

  return(
    <div style={{height: 640, width: '100%'}}>
      <DataGrid 
        rows={ rows } 
        columns={ columns }
        rowsPerPageOptions={[10,20,30]} 
        pageSize={10}
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  )
}

export default DataTable