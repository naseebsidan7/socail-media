import { useEffect,useState } from "react"
import { Box,useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import FriendListWidget from '../widgets/FriendListWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import UserWidget from '../widgets/UserWidget'
import PostsWidget from "../widgets/PostsWidget"

const ProfilePage = () => {
    const [user, setUser] = useState('')
    const { userId } = useParams();
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    
 
    const getUser = async () =>{
          const response = await fetch(
            `/api/users/${userId}`,{
              method: 'GET',
              headers: { Authorization: `Bearer ${token}`}
            })
          const data = await response.json()
          setUser(data)
    }

    useEffect(()=>{
        getUser()
    },[]) 

  if( !user ) return null
  return (
    <Box>
    <Navbar/>
    <Box
       width='100%'
       padding='2rem 6%'
       display={isNonMobileScreens? 'flex' : 'block'}
       gap='2rem'
       justifyContent='center'
    >
       <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget userId={userId} picturepath={user.picturePath} />
            <Box m='2rem 0' /> 
            <FriendListWidget userId={userId} />
       </Box>
       <Box flexBasis={isNonMobileScreens ? '42%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'}
       >
         <MyPostWidget picturePath={user.picturePath}  />
         <PostsWidget userId={userId} isProfile />
       
       </Box>

 


    </Box>
  </Box>
  )
}

export default ProfilePage