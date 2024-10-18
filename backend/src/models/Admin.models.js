import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const adminSchema = new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true,
        },
        Email:{
            type:String,
            required:true,
            unique:true,
        },
        Password:{
            type:String,
            required:true,
        },
        accessToken:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['SuperAdmin','Admin'],
            default:'Admin',
        }
    },{timestamps:true}
)
adminSchema.pre('save',async function(next){
    if(this.isModified("Password")){
        this.Password = await bcrypt.hash(this.Password,7);
      }
      return next();
})

adminSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.Password);
}

const Admin = mongoose.model('Admin',adminSchema);
export default Admin;