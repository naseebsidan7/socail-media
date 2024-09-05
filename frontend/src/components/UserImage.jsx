import { Box } from '@mui/material'
 

const UserImage = ({ image, size='60px'}) => {
 
      return (
         <Box width={size} height={size}>
              <img src={`${import.meta.env.VITE_API_URL}/assets/${image}`} 
                   style={{ objectFit:'cover', borderRadius:'50%' }} 
                   width={size} 
                   height={size} 
                   alt="user picture" />
         </Box>
      )
}

export default UserImage;