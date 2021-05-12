import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import Navbar from './components/Navbar';
import Vendor from './components/Vendor';
import './styles/app.scss';

function App() {
  const [vendors, setVendors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage, setVendorsPerPage] = useState(6);
  let currentVendors = null

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://foods.omplatform.com/api/om_food/v3/vendor/ordering/')
      const { data } = result.data
      
      setVendors(data)
    }
    fetchData()
  }, []);

  function openGoogleMap(location) {
    window.open("https://maps.google.com?q="+location.latitude+","+location.longitude );
    console.log('location', location);
  }

  const indexofLastVendor = currentPage * vendorsPerPage; 
  const indexofFirstVendor = indexofLastVendor - vendorsPerPage;
  if (vendors) {
    currentVendors = vendors.slice(indexofFirstVendor, indexofLastVendor)
  }
  
  console.log('currentVendors',currentVendors);

  
  return (
    <div className="App"> 
      <Navbar />
      <Container style={{marginTop: '40px'}}>
        <Grid container spacing={2}>
          {
            currentVendors  ? 
            currentVendors.map((vendor) => 
              <Grid item  xs={4} key={vendor.vendor_id} >
                <Vendor vendor={vendor} openGoogleMap={openGoogleMap}></Vendor>
              </Grid>
            )
            : <div>Loading vendors...</div>
          }
        </Grid>
      </Container>

    </div>
  );
}
export default App;
