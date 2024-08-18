import React,{ useState} from 'react'
import { Box,IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material'
import { Search, Message, DarkMode, LightMode, Notifications, Help,Menu, Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'
import { setMode, setLogout } from '../../state'

const Navbar = () => {
      const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false);
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const user = useSelector((state) => state.user);
      const isNonMobileScreens = useMediaQuery('( min-width: 1000px )')

      const theme = useTheme()
      const neutralLight = theme.palette.neutral.light;
      const dark = theme.palette.neutral.dark;
      const background = theme.palette.background.default;
      const primaryLight = theme.palette.primary.light;
      const alt = theme.palette.background.alt;

      const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest';
      console.log(fullName ,' <== USER NAME')

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
        <FlexBetween gap='1.7rem'>
           
            <Typography fontWeight='bold' 
                        fontSize='clamp(1rem, 2rem, 2.25rem)'
                        color='primary'
                        onClick={() => navigate('/home')}
                        sx={{ 
                            '&:hover':{
                              color: primaryLight,
                              cursor:'pointer'
                            }
                        }} >Qoott
            </Typography>

            { isMobileMenuToggled && (
                <FlexBetween borderRadius='9px' backgroundColor={neutralLight} gap='2rem' padding='0.1rem 1.5rem'>
                      <InputBase placeholder='Search..' />
                      <IconButton>
                          <Search/>
                      </IconButton>
                </FlexBetween>
            )}
            
       </FlexBetween>

       {/* DESKTOP */}
       { isNonMobileScreens ? (
             <FlexBetween gap='2rem'> 
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode ==='dark' ? (
                         <DarkMode sx={{fontSize:'25px'}}/>
                    ):(
                         <LightMode sx={{color:dark, fontSize:'25px'}}/>
                    )}
                </IconButton>
                <Message sx={{fontSize:'25px'}}/>
                <Notifications sx={{fontSize:'25px'}}/>
                <Help sx={{fontSize:'25px'}}/>

                <FormControl variant='standard' value={fullName}>
                      <Select value={fullName} sx={{
                              backgroundColor:neutralLight,
                              width:'150px',
                              borderRadius:'0.25rem',
                              p: '0.25rem 1rem',
                              '& .MuiSvgIcon-root':{
                                pr: '0.25rem',
                                width:'3rem'
                              },
                              '& .MuiSelect-select:focus':{
                                backgroundColor: neutralLight,
                              }
                      }} input={<InputBase/>}>
                         <MenuItem value={fullName} >
                              <Typography>
                           {    fullName || 'User name not found '}
                              </Typography>
                         </MenuItem>
                         <MenuItem
                            onClick={() => {
                              dispatch(setLogout());
                              navigate('/');
                            }}
                            >  Log Out
                            </MenuItem>

                      </Select>
                </FormControl>
              
             </FlexBetween>
             
       ): (
          <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Menu/>
          </IconButton>
       )}

       {/* MOBILE NAV */}
       { !isNonMobileScreens && isMobileMenuToggled && (
           
        <Box
           position='fixed'
           right='0'
           bottom='0'
           height='100%'
           maxWidth='500px'
           minWidth='300px'
           backgroundColor={background}
          boxShadow='5px 5px 5px 3px'
        >
            { /* CLOSE ICON */}
            <Box display='flex' justifyContent='center' p='2rem' marginBottom='1rem'>
                  <IconButton  
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                          <Close />
                  </IconButton>
              </Box>
            { /* MENU ITEM */}
            <FlexBetween gap='3rem' display='flex' flexDirection='column' justifyContent='center' alignItems='center'> 
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode ==='dark' ? (
                         <DarkMode sx={{fontSize:'25px'}}/>
                    ):(
                         <LightMode sx={{color:dark, fontSize:'25px'}}/>
                    )}
                </IconButton>
                <Message sx={{fontSize:'25px'}}/>
                <Notifications sx={{fontSize:'25px'}}/>
                <Help sx={{fontSize:'25px'}}/>

                <FormControl variant='standard' value={fullName}>
                      <Select value={fullName} sx={{
                              backgroundColor:neutralLight,
                              width:'150px',
                              borderRadius:'0.25rem',
                              p: '0.25rem 1rem',
                              '& .MuiSvgIcon-root':{
                                pr: '0.25rem',
                                width:'3rem'
                              },
                              '& .MuiSelect-select:focus':{
                                backgroundColor: neutralLight,
                              }
                      }} input={<InputBase/>}>
                         <MenuItem value={fullName} >
                              <Typography>
                              {fullName}
                              </Typography>
                         </MenuItem>
                         <MenuItem
                          onClick={() => {
                            dispatch(setLogout());
                            navigate('/');
                          }}
                           >Log Out</MenuItem>

                      </Select>
                </FormControl>
             </FlexBetween>
        </Box>
       )}

    </FlexBetween>
  )
}

export default Navbar