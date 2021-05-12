import { Button, Chip, Typography} from '@material-ui/core'
import styled from 'styled-components'
import { Call, Map, Close, Store } from '@material-ui/icons';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const VenderCard = styled.div`
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 100%;
  height: 350px;
  border-radius: 10px;
  transition: 0.3s;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
  }
` ;

const VenderImg = styled.img`
  display:block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: 150px;
  object-fit: cover;
`;

const VenderStatus = styled.div`
  position: absolute;
  top: 20px;
  right:-11px;
`; 

const VenderDetail = styled.div`
  padding: 2.2rem;
`;

const Footer = styled.div`
  position: absolute;
  bottom:0;
  left: 0;
  width: 100%;
  padding:3px 0;
  text-align: center;
`;

const handleImgError = e => {
  e.target.src = "/not-found.png"
}

const Vendor = ({vendor, openGoogleMap}) => {
  return (
    <VenderCard>
      <VenderImg height="150px" alt="/not-found.png" src={vendor.source} onError={handleImgError}  /> 
      <VenderDetail>
        <h3>{vendor.store_name} </h3>
        <Typography variant="body2" color="textSecondary" component="p">
          หมวดหมู่ร้านค้า: {vendor.categories.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Call  fontSize="small"  /> {vendor.store_phone}
        </Typography>
        <VenderStatus>
          {
            vendor.open ?  
            <Chip  icon={<Store />} color="primary" label="เปิดทำการ" style={{boxShadow: "0 6px 8px 0 rgba(0,0,0,0.3)"}} />
            :  <Chip  icon={<Close />} color="secondary" label="ปิดทำการ" style={{boxShadow: "0 6px 8px 0 rgba(0,0,0,0.3)"}} />
          }
        </VenderStatus>
      </VenderDetail>
      <Footer>
        <Button 
          startIcon={<Map />} 
          fullWidth variant="contained" 
          onClick={()=> openGoogleMap(vendor.store_location)} 
          size="large" 
          color="primary">
          Open Google Map
        </Button>
      </Footer>
    </VenderCard>
  )
}

export default Vendor;