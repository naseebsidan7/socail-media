import { Box } from '@mui/material'
import { styled } from '@mui/system'


const UserImage = ({ image, size='60px'}) => {
      const BASEURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      return (
         <Box width={size} height={size}>
              <img src={`${BASEURL}/assets/${image}`} 
                   style={{ objectFit:'cover', borderRadius:'50%' }} 
                   width={size} 
                   height={size} 
                   alt="user picture" />
         </Box>
      )
}

export default UserImage;