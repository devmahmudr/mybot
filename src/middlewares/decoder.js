import Io from "../helper/Io.js";
import { tokenHelper } from "../utils/token.js";

const Decoder = async (req,res,next)=>{
    try {
        //reading data
        const db = new Io('./db/users.json')
        const reader = await db.read()
        
        //decoding token
        const token = req.headers.authorization
        const decodedToken = tokenHelper.verify(token,process.env.SECRET_KEY)

        //if not have token
        if(!decodedToken){
            return res.status(401).json({"message":"invalid token"})
        }

        //cheacking user
        const user = reader.find(item => item.id == decodedToken.id)

        if(!user){
            return  res.status(403).json({ message: "Forbidden" });
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error.message);
    }
} 

export default Decoder