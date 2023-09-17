import mongoose from "mongoose"
import { Redis } from 'ioredis';



//**********************************MongoDb DataBase Connect logic*********************************/
export const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI as string).then((data) => {
        console.log(`database Connected`);         
    })
}


//**********************************RedisDataBase Connect logic*********************************/

export const redisClient=new Redis(process.env.REDIS_URL as string)
  
