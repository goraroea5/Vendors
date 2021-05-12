import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import Navbar from './components/Navbar';
import Vendor from './components/Vendor';
import Pagination from './components/Pagination';
import DataTable from './components/DataTable';
import './styles/app.scss';

function App() {
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(6);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios.get('https://foods.omplatform.com/api/om_food/v3/vendor/ordering/')
      const { data } = result.data
      setVendors(data)
      setLoading(false)
    }
    fetchData()
  }, []);

  function openGoogleMap(location) {
    window.open("https://maps.google.com?q="+location.latitude+","+location.longitude );
    console.log('location', location);
  }

  const fillterVendors = vendors.filter(vendor => {
    const upper = search.toUpperCase()
    return vendor.store_name.toUpperCase().includes(upper)
  })

  const indexofLastVendor = currentPage * vendorsPerPage; 
  const indexofFirstVendor = indexofLastVendor - vendorsPerPage;
  const currentVendors = fillterVendors.slice(indexofFirstVendor, indexofLastVendor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App"> 
      <Navbar search={search} setSearch={setSearch} />
      <Container style={{marginTop: '40px'}}>
        {
          !loading ?  
            <Grid container spacing={2} justify="center">
              { currentVendors.map((vendor) => 
                <Grid item  xs={4} key={vendor.vendor_id} >
                  <Vendor vendor={vendor} openGoogleMap={openGoogleMap}></Vendor>
                </Grid>
              )}
              <Grid item  xs={12}>
                <Pagination 
                  vendorsPerpage={vendorsPerPage} 
                  totalVendors={fillterVendors.length}
                  paginate={paginate}
                />
              </Grid>
              <Grid item  xs={12}>
                <DataTable vendors= { vendors } />
              </Grid>
            </Grid> 
          : <div>Loading vendors...</div>
        }
      </Container>

    </div>
  );
}
export default App;
