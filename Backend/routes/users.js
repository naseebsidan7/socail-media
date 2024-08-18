import express from 'express'
import { verifyToken } from '../middleware/Auth.js'
import { addRemoveFriend, getUser, getUserFriends } from '../controllers/users.js'
 
const router = express.Router()

console.log('USER ROUTES')
/* READ */
router.get('/:id', verifyToken, getUser )
router.get('/:id/friends', verifyToken, getUserFriends)

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend )



export default router