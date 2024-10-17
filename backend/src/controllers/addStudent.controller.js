import Student from "../models/Student.models.js";
import { Router } from 'express';
import multer from 'multer';

const router = Router();
const upload = multer(); 

router.post('/add', upload.none(), async (req, res) => {
    try {
        const {
            name, rollId, class: studentClass, DOB, yearOfAdmission,
            fatherName, fatherDOB, fatherPhoneNumber,
            motherName, motherDOB, motherPhoneNumber,
            state, city, village, pincode
        } = req.body;
        const newStudentData = {
            name: name?.trim(),
            rollId: rollId?.trim(),
            class: studentClass?.trim(),
            DOB: DOB ? new Date(DOB) : null, 
            yearOfAdmission: yearOfAdmission ? new Date(yearOfAdmission) : null,

            parent: {
                father: {
                    name: fatherName?.trim(),
                    DOB: fatherDOB ? new Date(fatherDOB) : null,
                    phoneNumber: fatherPhoneNumber?.trim(),
                },
                mother: {
                    name: motherName?.trim(),
                    DOB: motherDOB ? new Date(motherDOB) : null,
                    phoneNumber: motherPhoneNumber?.trim(),
                },
            },

            address: {
                state: state?.trim(),
                city: city?.trim(),
                village: village?.trim(),
                pincode: pincode ? parseInt(pincode) : null, 
             }
        };
        console.log('student data ',newStudentData);
        
        const newStudent = new Student(newStudentData);
        await newStudent.save(); 

        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.post('/edit/:id', upload.none(), async (req, res) => {
    try {
        const studentId = req.params.id;
        const {
            name, rollId, class: studentClass, DOB, yearOfAdmission,
            fatherName, fatherDOB, fatherPhoneNumber,
            motherName, motherDOB, motherPhoneNumber,
            state, city, village, pincode
        } = req.body;

        const updatedStudentData = {
            name: name?.trim(),
            rollId: rollId?.trim(),
            class: studentClass?.trim(),
            DOB: DOB ? new Date(DOB) : null,
            yearOfAdmission: yearOfAdmission ? new Date(yearOfAdmission) : null,

            parent: {
                father: {
                    name: fatherName?.trim(),
                    DOB: fatherDOB ? new Date(fatherDOB) : null,
                    phoneNumber: fatherPhoneNumber?.trim(),
                },
                mother: {
                    name: motherName?.trim(),
                    DOB: motherDOB ? new Date(motherDOB) : null,
                    phoneNumber: motherPhoneNumber?.trim(),
                },
            },

            address: {
                state: state?.trim(),
                city: city?.trim(),
                village: village?.trim(),
                pincode: pincode ? parseInt(pincode) : null,
            }
        };

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: updatedStudentData }, 
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.delete('/delete/:id',async (req,res)=>{
    try {
        const studentId = req.params.id;
        await Student.findByIdAndDelete(studentId);
        res.status(201).send('Student Deleted');
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})
router.get('/all',async (req,res)=>{
    try {
        const allStudent = await Student.find();
        res.json(allStudent);
    } catch (error) {
        res.status(402).send(`Error while fetching all student ${error}`);
    }
})
router.get('/userId/:id',async(req,res)=>{
    try {
        const studentId = req.params.id;
        console.log(studentId);
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})
export default router;
