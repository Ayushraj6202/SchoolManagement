import { Router } from "express";
import Admin from "../models/Admin.models.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { verifySuperAdmin } from "../middlewares/Admin.middleware.js";


const router = Router();
const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
}

router.post('/signup',verifySuperAdmin, async (req, res) => {
    const { Name, Email, Password, role } = req.body;
    // console.log("into signup ",Name,Email);
    try {
        let preExist = await Admin.findOne({ Email }); 
        if (preExist) {
            return res.status(400).josn({ msg: 'Admin already exists' });
        }
        const AdminNew = new Admin({ Name, Email, Password, role });
        await AdminNew.save({validateBeforeSave:false});
        // console.log("admin new  ",AdminNew);

        const createdAdmin = await Admin.findById(AdminNew._id).select("-Password");
        if (!createdAdmin) {
            return res.status(400).json({ msg: 'Admin not created' });
        }

        return res.status(201).json({ msg: 'Admin registered' });

    } catch (error) {
        res.status(501).json({ msg: 'Server Error' });
    }
})
router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    try {
        let findAdmin = await Admin.findOne({ Email });
        // console.log(Email,Password,findAdmin);
        
        if (!findAdmin) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const passwordMatch = await bcrypt.compare(Password, findAdmin.Password);
        // console.log("pass ",passwordMatch);
        
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }

        // console.log("admin details ", findAdmin);

        const token = jwt.sign({ adminId: findAdmin.id, role: findAdmin.role }, 'seceretkey', { expiresIn: '40h' });
        findAdmin.accessToken = token;
        findAdmin.save({ validateBeforeSave: false });
        // console.log("admin loggedin ", findAdmin);
        const adminRole = findAdmin.role;
        return res
            .cookie('token', token, options)
            .cookie('role', findAdmin.role, options)
            .json({ role: adminRole });
    } catch (error) {
        res.status(501).json({ msg: "Server Error" })
    }
})
router.post('/logout', (req, res) => {
    res.clearCookie('token', options);
    res.clearCookie('role', options);
    return res.status(200).send({ message: 'Logged out successfully' });
});
router.get('/refresh', async (req, res) => {
    const token = req.cookies.token;
    const role = req.cookies.role;
    console.log("refresh ", token, role);
    jwt.verify(token, 'seceretkey', async (err, _) => {
        if (err) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }
        res.json({ role: role });
    })
})
router.get('/all',async(req,res)=>{
    try {
        const AllAdmins = await Admin.find();
        return res.status(201).json(AllAdmins);
    } catch (error) {
        return res.status(501).json({msg:"Server Error"});
    }
})
router.delete('/delete/:id',verifySuperAdmin,async(req,res)=>{
    try {
        const adminId = req.params.id;
        // console.log("admin id backend ",adminId,req.admin);
        
        if(!adminId){
            return res.json({msg:"No admin found"});
        }
        await Admin.findByIdAndDelete(adminId);
        return res.json({msg:"Admin deleted"});
    } catch (error) {
        return res.status(501).json({msg:"Server Error"});
    }
})
router.post('/admin/:id',verifySuperAdmin,async(req,res)=>{
    try {
        const {role} = req.body;
        const adminId = req.params.id;
        const adminChnageId = req.Admin.id;
        console.log(role,adminId,adminChnageId);
        if(adminChnageId===adminId){
            return res.status(402).json({msg:"Cannot change own role"});
        }
        const adminHere = await Admin.findById(adminId);
        adminHere.role = role;
        await adminHere.save({validateBeforeSave:false});
        res.status(201).json({msg:"Role Changed"})
    } catch (error) {
        return res.status(501).json({msg:"Server Error"});
    }
})
export default router;