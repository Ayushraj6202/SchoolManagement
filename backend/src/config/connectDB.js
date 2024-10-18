import mongoose from "mongoose";
const pathMongoDB = process.env.MONGO_DB_URL;
const database = process.env.DATABASE;
// console.log(pathMongoDB,database);

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${pathMongoDB}/${database}`,{

        })
        console.log('DB Connected');
        
    } catch (error) {
        console.log('DB not connected ',error.message);
        process.exit(1);
    }
}
export default connectDB;