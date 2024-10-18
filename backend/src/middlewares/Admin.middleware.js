import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.models.js';

export const verifySuperAdmin = async (req,res,next)=>{
    const token = req.cookies.token;
    console.log('verify super ',token,req.cookies);

    if(!token){
        return res.status(401).json({msg:"Token Not Found"});
    }
    try {
        const decoded = jwt.verify(token,'seceretkey');
        console.log("decoded ",decoded);
        const AdminFind = await Admin.findById(decoded.adminId).select("-Password");
        console.log(AdminFind);
        
        if(!AdminFind){
            return res.status(401).json({msg:"Invalid AccessToken"});
        }
        if(AdminFind.role!=='SuperAdmin'){
            return res.status(409).json({msg:"You are Not SuperAdmin"});
        }
        req.Admin = AdminFind;
        next();
    } catch (error) {
        res.status(401).json({msg:'Token Not valid'});
    }
}
export const verifyAdmin =  async (req,res,next)=>{
    const token = req.cookies.token;
    console.log('verify admin ',token);

    if(!token){
        return res.status(401).json({msg:"Token Not Found"});
    }
    try {
        const decoded = jwt.verify(token,'seceretkey');
        console.log("decoded ",decoded);
        const AdminFind = await Admin.findById(decoded.adminId).select("-Password");
        if(!AdminFind){
            return res.status(401).json({msg:"Invalid AccessToken"});
        }
        req.Admin = AdminFind;
        next();
    } catch (error) {
        res.status(401).json({msg:'Token Not valid'});
    }
}

export default{
    verifyAdmin,
    verifySuperAdmin,
};