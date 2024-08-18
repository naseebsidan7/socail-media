import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


/* REGISTER USER  */
export const register = async (req, res) => {
    try {
        const { 
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation
        } = req.body;

        const userExists = await User.findOne({ email })
        if(userExists){
              res.status(400);
              throw new Error('User already exists')
        }
  
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random( ) * 1000),
            impressions: Math.floor(Math.random( ) * 1000),
        })
        const savedUser = await newUser.save()

        if(savedUser){
            res.status(201).json({
                  _id:savedUser._id,
                  lastName:savedUser.lastName,
                  email:savedUser.email
            })
        }else{
                res.status(400);
                throw new Error('Invalid user data')
        }

    } catch (err) {
        res.status(500).json({ error: err?.message})
    }
}

/* LOGIN USER  */
export const login = async(req, res)=>{
  try {
     const { email, password } = req.body;

     const user = await User.findOne({ email })
     if(!user)return  res.status(401).json({ message: 'User does not exists'})
     

     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch) return res.status(400).json({message:'Invalid email or password '})
     

     const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET,{ expiresIn:'30d'})
     res.status(200).json({ token, user });
     
  } catch (err) {
    res.status(500).json({ error: err?.message})
  }
}